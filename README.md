# Backend de la suerte **parte 2 (y 3)**

Backend: 🐛 `nhost.io` 🐛

Frontend: 🦄 `vue3` 🦄 y 🌈 `vercel` 🌈.

* Disponible online: [backend-de-la-suerte-parte-2.vercel.app](https://backend-de-la-suerte-parte-2.vercel.app/)

<br>

## Cómo funciona

La idea es tener un contador y cada 5 hits ⛏ encontremos oro 🥇.  
> Para gamificarlo un poco los hits son globales, así que si haces 4 y no encuentras oro, si viene otro y hace el 5º se lo va a llevar él.

<br />

## Estructura del proyecto

### ¿Puede todo estar en el mismo repositorio (frontend + backend)?

#### Nhost

[Github integration](https://docs.nhost.io/platform/nhost/github-integration): En `nhost.io` cuando conectas el proyecto a un repositorio de controlador de versiones (Github).  Éste está observando la rama main/master para hacer el deploy automático.

Las carpetas/archivos que le interesan son:
* **`/functions`**  [Código/estructura de las funciones lambda](https://docs.nhost.io/platform/serverless-functions)
* **`/nhost`** Informacion sobre ?
* **`/metadata`** 

#### Vercel
En `vercel` cuando conectas el proyecto a un repositorio de controlador de versiones (Github). Éste está observando la rama main/master para hacer el deploy automático.

Estoy manteniendo el código de ambos en el mismo repositorio y (por ahora) no hay problema.  Lo único es que si modifico, por ejemplo, una función serverless de `nhost` y hago deploy, `vercel` también vuelve a hacer el build, o viceversa.


<br />

## Suscripciones con graphQL ¡Oh yeah!

Para mantener una página principal viva graphQL permite suscribirnos a una query y (por lo que promete) ver los cambios en tiempo real.  Ideal para mostrar un ranking de mineros y los hits ⛏ y oro 🥇 que tienen.

Para poder utilizar suscripciones (creo) que tenemos que dejar de lado el cliente del sdk de `nhost` y usar el cliente de `apollo`.  Para `vue3` tenemos que hacer lo siguente:

```
npm install --save graphql graphql-tag @apollo/client
```

```
npm install --save @vue/apollo-composable
```

Siguiendo la documentación que hay en [Vue Apollo](https://v4.apollo.vuejs.org/guide/installation.html#compatibility), de una forma *sencilla* deberíamos ser capaces de hacer una suscripción.

```
subscription GetMiners {
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
    }

```

### <span style="color:red">Error</span>

No acaba de funcionar y nhost deja de tener conexión con Hasura durante unos minutos.  Me pongo en contacto con soporte (*feedback* + *discord*):

> I've managed to execute this query:
> 
> ```
> query GetGold {
>     users {
>         id
>         displayName
>         avatarUrl
>         mina {
>             oro
>         }
>     }
> }
> ```
> 
> But I want to use a suscription, then i `nhost.graphql.request`:
> ```
> subscription GetGold {
>     users {
>         id
>         displayName
>         avatarUrl
>         mina {
>             oro
>         }
>     }
> }
> ```
> 
> But Im getting "subscriptions are not supported over HTTP, use websockets instead"...
> 
> I've been trying to use graphQL subscriptions as said as in the docs: https://docs.nhost.io/platform/database/graphql#subscriptions but it doesn't work.
> 
> First i tried with the NHostClient but i was getting "subscriptions are not supported over HTTP, use websockets instead", then i changed to websocket but then > failed (as i did not found any doc about i used the same hasura url but changing protocol to wss://).
> 
> I've changed the approach and tried ApolloClient and I've followed this documentation: https://v4.apollo.vuejs.org/guide-option/subscriptions.html#setup but it > fails horribly, even i lost any connection to Hasura (console, list of users inside nhost, etc)
> 

La respuesta de nhost es que la han liado parda.

### <span style="color:green">Workaround</span>

**Polling cutre**: Cada 3 segundos hago una petición al servidor para actualizar los datos. 😢


## Funciones serverless

### CORS

Todo bien hasta toparme con un CORS.

Nada en la documentación sobre el tema.

Por suerte, en github una [discusión en github](https://github.com/nhost/nhost/discussions/276) resuelve la papeleta.

### 404 documentación

Para implementar una función serverless y se conecte a la base de datos con los permisos que tiene el usuario que ha ejecutado la función, no hay nada.  Bueno... no hay nada... Parece que hay algo: https://docs.nhost.io/get-started/cli-workflow/metadata-and-serverless-functions que podría ser la respuesta (porque habla de tablas y permisos...) pero al final la función serverless es una función que devuelve la hora (sin llegar nunca a conectarse a la base de datos 😢).  Mi gozo en un pozo.




## UI/UX

### Taiwind

[Install tailwind CSS with Vue 3 and Vite](https://tailwindcss.com/docs/guides/vite)

1. Install Tailwind CSS
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Configure your template paths
```
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. Add the Tailwind directives to your CSS
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. Importar el CSS.
