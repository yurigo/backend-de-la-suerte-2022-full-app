# Backend de la suerte **parte 2**

El backend es nhost.io
El frontend es vue3 y en vercel.

# ¿Puede todo estar en el mismo repositorio?
nhost.io requiere la carpeta functions para contener el código de las lambdafunctions.

[Github integration](https://docs.nhost.io/platform/nhost/github-integration): En nhost.io cuando conectas el proyecto a un repositorio de controlador de versiones (Github).  Éste está observando la rama main/master constantemente para hacer el deploy automático.

Las carpetas/archivos que le interesan son:
* **`/functions`**  [Código/estructura de las funciones lambda](https://docs.nhost.io/platform/serverless-functions)
* **`/nhost`** Informacion sobre ?
* **`/metadata`** 


# Suscripciones con graphQL ¡Oh yeah!

```
npm install --save graphql graphql-tag @apollo/client
```

```
npm install --save @vue/apollo-composable
```



# Suscriptions
I've managed to execute this query:

quwry GetGold {
    users {
        id
        displayName
        avatarUrl
        mina {
            oro
        }
    }
}

But I want to use a suscription, then i nhost.graphql.request:
subscription GetGold {
    users {
        id
        displayName
        avatarUrl
        mina {
            oro
        }
    }
}

But Im getting "subscriptions are not supported over HTTP, use websockets instead"...



I've been trying to use graphQL subscriptions as said as in the docs: https://docs.nhost.io/platform/database/graphql#subscriptions but it doesn't work.

First i tried with the NHostClient but i was getting "subscriptions are not supported over HTTP, use websockets instead", then i changed to websocket but then failed (as i did not found any doc about i used the same hasura url but changing protocol to wss://).

I've changed the approach and tried ApolloClient and I've followed this documentation: https://v4.apollo.vuejs.org/guide-option/subscriptions.html#setup but it fails horribly, even i lost any connection to Hasura (console, list of users inside nhost, etc)



