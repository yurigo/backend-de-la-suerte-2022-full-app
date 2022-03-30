<script setup>
import { ref, watchEffect } from "vue";
import { RouterLink , useRoute, useRouter } from "vue-router";

import nhost from "@/nhost";

const router = useRouter()

async function signOut(){
    console.log("signOut")
    await nhost.auth.signOut();
    // isAuthenticated.value = nhost.auth.isAuthenticated();
    // router.push("/");
    // router.go(0)
    window.location = "/"
}

const isAuthenticated = ref(nhost.auth.isAuthenticated())
console.log('isAuthenticated' , nhost.auth.isAuthenticated, nhost.auth.isAuthenticated(), isAuthenticated.value)

</script>

<template>
    <header>
        <nav>
            <!-- <a href="/">Home</a>
            <a href="/authors">Authors</a>
            <a href="/articles">Articles</a> -->
            <RouterLink active-class="selected" to="/">Mina</RouterLink>
            <RouterLink v-if="isAuthenticated" active-class="selected" to="/About">About</RouterLink>
            <RouterLink v-if="!isAuthenticated" to="/login">Log In</RouterLink>
            <!-- <RouterLink v-if="isAuthenticated" @click="signOut" to="#">Sign Out</RouterLink> -->
            <a v-if="isAuthenticated" @click="signOut"> Sign out </a>
        </nav>
    </header>
</template>

<style scoped>
.selected{
    color: red;
}

</style>
