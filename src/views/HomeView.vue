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

const response = await nhost.graphql.request(`
query MyQuery {
  users(order_by: {mina: {oro: desc_nulls_last}}) {
    id
    displayName
    avatarUrl
    pico_aggregate {
      aggregate {
        count(columns: id_user)
      }
    }
    mina {
      oro
    }
  }
}
`);

miners.value = response.data.users;
console.log(miners.value);

async function mineralismo() {

    const { res, error } = await nhost.functions.call('/hit')

console.log(res)
console.log(error)

return ;

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

    miners.value = response.data.users;
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
