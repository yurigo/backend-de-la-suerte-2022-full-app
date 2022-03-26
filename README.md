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
