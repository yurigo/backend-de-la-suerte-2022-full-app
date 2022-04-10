// import { createApp } from 'vue'
// import { createPinia } from 'pinia'

// import App from './App.vue'
// import router from './router'

// const app = createApp(App)

// app.use(createPinia())
// app.use(router)

// app.mount('#app')

import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import { DefaultApolloClient } from '@vue/apollo-composable'


import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

// needed for websockets:
import { split } from '@apollo/client/core'
//import { WebSocketLink } from 'apollo-link-ws'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from 'apollo-utilities'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: `${import.meta.env.VITE_NHOSTS_URL}/v1/graphql`,
})

// const wsLink = new WebSocketLink({
//   uri: `wss://txvmbrkukwgehmpfbvvc.nhost.run/v1/graphql`,
//   options: {
//     reconnect: true,
//   },
// })

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${import.meta.env.VITE_NHOSTS_WS}/v1/graphql`,
  })
)

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink,
)


// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: link,
  cache
})


import App from './App.vue'
import router from './router'


const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(createPinia())
app.use(router)

app.mount('#app')