<script setup>
import { ref, watchEffect } from "vue";
import { RouterLink , useRoute, useRouter } from "vue-router";

import nhost from "@/nhost";

const router = useRouter()

async function signOut(){
    console.log("signOut")
    await nhost.auth.signOut();
    window.location = "/"
}

const isAuthenticated = await nhost.auth.isAuthenticatedAsync()
console.log('isAuthenticated' , nhost.auth.isAuthenticated, nhost.auth.isAuthenticated(), isAuthenticated)

</script>

<template>
    <header>
        <nav>
            <RouterLink active-class="selected" to="/">Mina</RouterLink>
            <RouterLink v-if="isAuthenticated" active-class="selected" to="/About">About</RouterLink>
            <RouterLink v-if="!isAuthenticated" to="/login">Log In</RouterLink>
            <a v-if="isAuthenticated" @click="signOut"> Sign out </a>
        </nav>
    </header>
</template>

<style scoped>
.selected{
    color: red;
}

</style>
