<script setup>
import { ref, reactive } from "vue";
import nhost from "@/nhost";
import gql from "graphql-tag";

import { RouterLink, useRouter } from "vue-router";

import Navigation from "../components/Navigation.vue";
import Miner from "../components/Miner.vue";
import router from "../router";

let miners = ref([]);
let debug = ref(false);

/**
 * Obtengo a los mineros.
 * Estoy dejando obsoleta la tabla mina (oro) ya que se puede calcular con el agregado de hits cuando el oro es true.
 * No obstante, con mina(oro) se podía ordenar por el oro: (order_by: {mina: {oro: desc_nulls_last}})
 * Quería ordenares los mineros por su oro pero no se puede hacer sobre agregado y condicional.
 * Se ordenará el array en js al recibir los resultados.
 */


async function getMiners(){

  const QUERY = `
    query MyQuery {
      users {
        id
        displayName
        avatarUrl
        oro: pico_aggregate(where: {oro: {_eq: true}}) {
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
    }`;

  const response = await nhost.graphql.request(QUERY);
  
  // ordenar los users por su oro
  
  // copilot:
  // const users = response.data.users.sort((a, b) => {
  //     if (a.oro.aggregate.count > b.oro.aggregate.count) {
  //         return -1;
  //     }
  //     if (a.oro.aggregate.count < b.oro.aggregate.count) {
  //         return 1;
  //     }
  //     return 0;
  // });

  // not copilot:
  const users = response.data.users.sort((a, b) => {
    return b.oro.aggregate.count - a.oro.aggregate.count
  });

  return users;

}

miners.value = await getMiners();

// como no funcionan las suscripciones hago un polling de los mineros cada ¿3 segundos?
setInterval(async () => {
  miners.value = await getMiners();
}, 3000);

async function mineralismo() {

    if (!nhost.auth.isAuthenticated()) {
        return router.push('/login');
    }

    // console.log("mineralismo", nhost.auth.session.user.id);
    // const myId = nhost.auth.session.user.id;
    // console.log(myId);

    //   const hitResponse = await nhost.graphql.request(`
    //     mutation MyMutation($oro: Boolean = false) {
    //       insert_mina_pico(objects: {oro: $oro}) {
    //         affected_rows
    //       }
    //     }
    //   `,
    //       { oro: false }
    //   );

    //   const mutationResponse = await nhost.graphql.request(`
    //     mutation FoundGold($_eq: uuid!) {
    //       insert_mina_mina(objects: {}, on_conflict: {constraint: mina_pkey}) {
    //         affected_rows
    //       }
    //       update_mina_mina(where: {user: {id: {_eq: $_eq}}}, _inc: {oro: 1}) {
    //         affected_rows
    //       }
    //     }
    //   `,
    //       { _eq: nhost.auth.session.user.id }
    //   );

    //   const response = await nhost.graphql.request(`
    //     query MyQuery {
    //       users(order_by: {mina: {oro: desc_nulls_last}}) {
    //         id
    //         displayName
    //         avatarUrl
    //         pico_aggregate {
    //           aggregate {
    //             count(columns: id_user)
    //           }
    //         }
    //         mina {
    //           oro
    //         }
    //       }
    //     }
    // `);

    const { res, error } = await nhost.functions.call('/hit')

    if (error) {
        console.log(error);
    }

    // const response = await nhost.graphql.request(QUERY);
    // miners.value = response.data.users;

    miners.value = await getMiners();
}


</script>

<template>
    <Navigation />
    <main>
        <code v-if="debug"><pre>{{ JSON.stringify(miners, null , 2) }}</pre></code>
        <!--<code><pre>{{ JSON.stringify(minersFromApollo.users, null , 2) }}</pre></code>-->
        <!--<code><pre>{{ JSON.stringify(minersFromSubscription.users, null , 2) }}</pre></code>-->

        <div class="mina">
            <Miner
                v-for="miner in miners"
                :user="miner"
                :key="miner.id"
            ></Miner>
        </div>

        <button @click="mineralismo"><img src="@/assets/pico-48.png" alt=""></button>
    </main>
</template>

<style scoped>

code{
  font-size: .7em;
}

.mina {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    gap: 1rem;
}

button {
  position:fixed;
  bottom: 10rem;
  left: 50%;
  height: 73px;
  width: 350px;
  background-color: #f7f7f7;
  border-style: none;
  border-radius: 10px;
  font-size: 2rem;
  border: 5px solid #517699;
  cursor: pointer;
  transform: translateX(-50%);
}
button:hover{
  background-color: #517699;
  color: #517699;
}
button:active{
  border-color: #8aafd1;
  background-color: #8aafd1;
  color: #f7f7f7;
}
img{
  top:5px;
  vertical-align: baseline;
}
</style>
