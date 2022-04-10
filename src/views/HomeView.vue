<script setup>
import { ref, reactive, watch } from "vue";
import nhost from "@/nhost";
import { useSubscription } from "@vue/apollo-composable";
import gql from "graphql-tag";

import { RouterLink, useRouter } from "vue-router";

import Navigation from "../components/Navigation.vue";
import Miner from "../components/Miner.vue";
import router from "../router";

let miners = ref([]);
let debug = ref(false);
let enableButton = ref(true);
let encontradoOro = ref(false);

/**
 * Obtengo a los mineros.
 * Estoy dejando obsoleta la tabla mina (oro) ya que se puede calcular con el agregado de hits cuando el oro es true.
 * No obstante, con mina(oro) se podía ordenar por el oro: (order_by: {mina: {oro: desc_nulls_last}})
 * Quería ordenares los mineros por su oro pero no se puede hacer sobre agregado y condicional.
 * Se ordenará el array en js al recibir los resultados.
 */

const { result } = await useSubscription(gql`
    subscription MySubscription {
        users {
            id
            displayName
            avatarUrl
            oro: pico_aggregate(where: { oro: { _eq: true } }) {
                aggregate {
                    count(columns: id_user)
                }
            }
            hits: pico_aggregate {
                aggregate {
                    count(columns: id_user)
                }
            }
        }
    }
`);

watch(
    result,
    (newValue) => {
        miners.value = newValue.users.sort((a, b) => {
            return b.oro.aggregate.count - a.oro.aggregate.count;
        });
    }
);

async function mineralismo() {

    enableButton.value = false;
    if (!nhost.auth.isAuthenticated()) {
        return router.push("/login");
    }

    const { res, error } = await nhost.functions.call("/hit");

    if (error) {
        console.log(error);
    }

    if (res.data.encontradoOro) {
        console.log("Has encontrado oro!!");
        // modifico el color del body si se ha encontrado oro
        // lo hago accediendo al document.body, es correcto?
        // o se debería hacer de algun otro modo?
        document.body.classList.add("oro")
        setTimeout(() => {
            document.body.classList.remove("oro")
        }, 250);
    }

    encontradoOro.value = res.data.encontradoOro;
    enableButton.value = true;
}
</script>

<template>
    <Navigation />
    <main>
        <code v-if="debug">
            <pre>{{ JSON.stringify(miners, null, 2) }}</pre>
        </code>
        <div class="mina">
            <Miner
                v-for="miner in miners"
                :user="miner"
                :key="miner.id"
            ></Miner>
        </div>

        <button
            :disabled="!enableButton"
            class="text-center border-4 border-indigo-500 bg-indigo-500/100 
            
            hover:bg-indigo-500/50
            active:border-indigo-500/50
            
            disabled:cursor-not-allowed
            disabled:bg-gray-500
            disabled:border-gray-500/50"

            @click="mineralismo"
        >
            <img src="@/assets/pico-48.png" alt="" />
        </button>

    </main>
</template>

<style scoped>
code {
    font-size: 0.7em;
}

.mina {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
}

button {
    position: fixed;
    bottom: 10rem;
    left: 50%;
    height: 73px;
    width: 350px;
    border-radius: 10px;
    font-size: 2rem;
    cursor: pointer;
    transform: translateX(-50%);
}

img {
    margin: 0 auto;
}
</style>
