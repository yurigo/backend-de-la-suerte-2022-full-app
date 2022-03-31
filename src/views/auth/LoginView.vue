<script setup>

import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
// import { NhostClient } from "@nhost/nhost-js";
import nhost from "@/nhost";

const email = ref("");
const password = ref("");
const router = useRouter()

const user = ref(nhost.auth?.session?.user);
const error = ref("");

watchEffect(() => {
  if (user.value) {
      router.push("/");
  }
});

async function login(){
    
    console.log("user" , email.value)
    console.log("password" , password.value)

    // const nhost = new NhostClient({
    //     backendUrl: import.meta.env.VITE_NHOSTS_URL,
    // });

    const response = await nhost.auth.signIn({
        email: email.value,
        password: password.value
    })


    console.log("response", response)

    // Redirect to home
    // console.log("router", router)
    if (response.error){
      error.value = response.error.message;
      return console.log("error", response.error)
    } 

    user.value = nhost.auth?.session?.user;
}

async function loginGitHub(){
    const response = await nhost.auth.signIn({
        provider: "github"
    });
    console.log("response", response)
    if (response.error){
      error.value = response.error.message;
      return console.log("error", response.error)
    } 

    user.value = nhost.auth?.session?.user;
}

</script>

<template>
    <div id="login">
        <div class="title">
          <h1><RouterLink to="/"> 🡠 </RouterLink> Login</h1>
          <h3><RouterLink to="/signup">I'm new</RouterLink></h3>
        </div>

        <label for="email">email</label>
        <input id="email" name="email" type="email" v-model="email">
        <br>
        <label for="password">password</label>
        <input id="password" name="password" type="password" v-model="password">
        <br>
        <br>
        <br>
        <button @click="login">Login</button>
        <br />
        <div v-if="error" class="error">
            {{ error }}
        </div>
        <br />
        <br>
        - or -
        <br>
        <br>
        <button @click="loginGitHub">Login with github</button>
    </div>
</template>


<style scoped>
div#login{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 300px;
    margin: 0 auto;
}

.title{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 2rem;
}

.title a{
  text-decoration: none;
}

div label,
div input
{
    width: 100%;
    height: 40px;
}

div button{
    height: 40px;
    width: 50%;
}
</style>