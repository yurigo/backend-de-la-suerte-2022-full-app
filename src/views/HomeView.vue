<script setup>
import { ref } from "vue";
import  nhost  from "@/nhost";
import Navigation from "../components/Navigation.vue";

console.log(nhost.auth.session.user.id)
// Get my oro
const response = await nhost.graphql.request(`
  query MyQuery{
    mina_mina(where: {user: {id: {_eq: "${nhost.auth.session.user.id}"}}}) {
      oro
      user{
        id
        displayName
      }
      created_at
      }
  }
`,
null,
{
  headers: {
    "X-Hasura-Role": "user"
  }
});

console.log(response)

// Get all oros
const response2 = await nhost.graphql.request(`
  query MyQuery{
    mina_mina {
      oro
      user{
        id
      }
      created_at
      }
  }
`,
null
,
{
  headers: {
    
    }
})

    console.log(response2)
</script>

<template>
    <Navigation/>
    <main>
        Hello world!,
        <code>
          <pre>{{ JSON.stringify(response.data, null , 2) }}</pre>
        </code>
        <br>
        All worlds!, 
        <br>
        <code><pre>{{ JSON.stringify(response2.data, null , 2) }}</pre>
        </code>
    </main>
</template>
