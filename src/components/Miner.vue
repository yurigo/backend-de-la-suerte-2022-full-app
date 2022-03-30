<script setup>
import nhost from '../nhost';
    import { ref, watchEffect } from "vue";

    // vue3 props

    const props = defineProps(['user', 'mina'])
    console.log(props.foo)

    const isAuthenticated = ref(nhost.auth.isAuthenticated())

</script>

<template>

    <div>
        <div v-if="isAuthenticated">{{ user.displayName }}</div>
        <div v-else> ----- </div>
        <img :src="user.avatarUrl" :alt="user.id" />
        <div>{{ mina?.oro }}</div>
    </div>

</template>

<style scoped>

</style>
