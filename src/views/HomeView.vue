<script setup>
import { ref, reactive } from "vue";
import  nhost  from "@/nhost";
import gql from "graphql-tag";

import { RouterLink, useRouter } from "vue-router";

import Navigation from "../components/Navigation.vue";
import Miner from "../components/Miner.vue";

// import { useQuery } from "@vue/apollo-composable";
// import { useSubscription } from "@vue/apollo-composable";

let miners = ref([])
// const minersApo = ref([])
// const minersSub = ref([])

// console.log(nhost.auth.session.user.id)
// Get my oro
// const response = await nhost.graphql.request(`
//   query MyQuery{
//     mina_mina(where: {user: {id: {_eq: "${nhost.auth.session.user.id}"}}}) {
//       oro
//       user{
//         id
//         displayName
//       }
//       created_at
//       }
//   }
// `,
// null,
// {
//   headers: {
//     "X-Hasura-Role": "user"
//   }
// });
// console.log(response)


/*


subscription GetTodos {
  todos {
    title
    body
    done
  }
}

*/


// Get all oros
const response = await nhost.graphql.request(`
    query GetGold {
      users {
        id
        displayName
        avatarUrl
        mina {
          oro
        }
      }
    }`,
  )

console.log("x" , response)


// const GET_GOLD = gql`
//     query GetGold {
//       users {
//         id
//         displayName
//         avatarUrl
//         mina {
//           oro
//         }
//       }
//     }`

// const { result: minersFromApollo }  = useQuery(GET_GOLD)

// console.log("responseApollo: " , minersFromApollo)

// const { result: minersFromSubscription  } = useSubscription(gql`
//     subscription SubscribeToGold {
//       users {
//         id
//         displayName
//         avatarUrl
//         mina {
//           oro
//         }
//       }
//     }`)

miners.value = response.data.users
console.log(miners.value)

async function mineralismo(){
  console.log("mineralismo" , nhost.auth.session.user.id)
  // return;

  const myId = nhost.auth.session.user.id;

console.log(myId)

      const { res: res1 , error: error1 } = await nhost.functions.call('/random')
      console.log("res1: " , res1)
      console.log("res1: " , error1)
      
      const { res: res2, error: error2 } = await nhost.functions.call('/hit')

      console.log("res2: " , res2)
      console.log("error2: " , error2)

  const mutationResponse = await nhost.graphql.request(`
    mutation FoundGold($_eq: uuid!) {
      insert_mina_mina(objects: {}, on_conflict: {constraint: mina_pkey}) {
        affected_rows
      }
      update_mina_mina(where: {user: {id: {_eq: $_eq}}}, _inc: {oro: 1}) {
        affected_rows
      }
    }
    `,
    { _eq: nhost.auth.session.user.id },
    // { _eq: '4bdc7de1-e85c-49d6-9db8-50a3e195efd4' },
  )



  const response = await nhost.graphql.request(`
      query GetGold {
        users {
          id
          displayName
          avatarUrl
          mina {
            oro
          }
        }
      }`,
    )

  
  miners.value = response.data.users

}


</script>

<template>
    <Navigation/>
    <main>
        
        Hello world!, 
        <br>
        <code><pre>{{ JSON.stringify(miners, null , 2) }}</pre></code>
        <!--<code><pre>{{ JSON.stringify(minersFromApollo.users, null , 2) }}</pre></code>-->
        <!--<code><pre>{{ JSON.stringify(minersFromSubscription.users, null , 2) }}</pre></code>-->
        
        <Miner v-for="miner in miners" :user="miner" :mina="miner.mina" :key="miner.id"></Miner>

        <button @click="mineralismo">⛏</button>

    </main>
</template>
