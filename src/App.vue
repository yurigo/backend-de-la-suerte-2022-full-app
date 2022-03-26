<script setup>
import { RouterView } from "vue-router";
import { onErrorCaptured, Suspense } from "vue";

onErrorCaptured(async (error, vm, info) => {
    console.log("App.error: ", error);
    console.log("App.info: ", info);
});

</script>

<template>
    <RouterView v-slot="{ Component }">
        <Suspense timeout="200">
            <template #default>
                <Component :is="Component" />
            </template>
            <template #fallback>
                <span>Loading...</span>
            </template>
        </Suspense>
    </RouterView>
</template>

<style>
@import "./assets/base.css";

main {
    padding: 1rem;
}
</style>
