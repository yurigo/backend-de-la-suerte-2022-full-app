<script setup>

import { ref } from "vue";
import { useRouter } from "vue-router";
// import { NhostClient } from "@nhost/nhost-js";
import nhost  from "@/nhost";

const email = ref("");
const password = ref("");
const router = useRouter()

async function signup(){
    
    console.log("user" , email.value)
    console.log("password" , password.value)

    // const nhost = new NhostClient({
    //     backendUrl: import.meta.env.VITE_NHOSTS_URL,
    // });

    const response = await nhost.auth.signUp({
        email: email.value,
        password: password.value
    })

    console.log("response", response)

    // Redirect to home
    // console.log("router", router)
    if (response.error){
        return console.log("error", response.error)
    } 

    

    router.push('/')


}

</script>

<template>
    <div>
        <h1>Sign Up</h1>
        <label for="email">email</label>
        <input id="email" name="email" type="email" v-model="email">
        <br>    
        <label for="password">password</label>
        <input id="password" name="password" type="password" v-model="password">
        <br>
        <br>
        <br>
        <button @click="signup">Sign Up</button>
    </div>
</template>


<style scoped>
div{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
    width: 300px;
    margin: 0 auto;
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
