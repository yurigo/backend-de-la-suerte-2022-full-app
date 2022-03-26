<script setup>
import { RouterLink , useRoute } from "vue-router";

import nhost from "@/nhost";

async function signOut(){
    console.log("signOut")
    await nhost.auth.signOut();
}

const isAuthenticated = nhost.auth.isAuthenticated();

</script>

<template>

    <header>
        <nav>
            <!-- <a href="/">Home</a>
            <a href="/authors">Authors</a>
            <a href="/articles">Articles</a> -->
            <RouterLink active-class="selected" to="/">Mina</RouterLink>
            <RouterLink active-class="selected" to="/About">About</RouterLink>
            <RouterLink @click="signOut" to="#">Sing Out</RouterLink>
        </nav>
    </header>
</template>

<style scoped>
.selected{
    color: red;
}

</style>
