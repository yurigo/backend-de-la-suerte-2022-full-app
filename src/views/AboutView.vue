<script setup>
import  nhost  from "@/nhost";
import Navigation from "../components/Navigation.vue";
</script>

<template>
<Navigation/>
    <main>
        About, {{ nhost.auth.getUser()}}
    </main>
</template>
