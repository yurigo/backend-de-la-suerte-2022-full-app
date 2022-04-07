<script setup>
import { ref, computed } from "vue";
const props = defineProps(["user"]);
const oro = computed(() => props.user.oro?.aggregate?.count || 0);
const pico = computed(() => props.user.hits?.aggregate?.count || 0);
</script>

<template>
    <div class="minero">
        <div class="display-name">{{ props.user.displayName }}</div>
        <img :src="props.user.avatarUrl" :alt="props.user.id" />
        <div class="stats">
            <div>🥇 {{ oro }}</div>
            <div>⛏ {{ pico }}</div>
        </div>
    </div>
</template>

<style scoped>
.minero {
    width: 150px;
    transition: transform 0.1s ease-out;
}
.minero img {
    width: 150px;
    transition: transform 0.3s ease-out;
}

.minero:hover {
    transform: scale(1.1);
    z-index: 40;
}

.minero:hover img {
    transform: scale(1.2);
    background-color: var(--color-background);
    box-shadow: 0 0 0 2px var(--vt-c-indigo);
    z-index: 41;
}

.display-name {
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;

    width: 100%;
    overflow: hidden;
    font-weight: 100;
    font-size: 1.3rem;
    text-align: center;
    margin-bottom: 0.5rem;
    text-overflow: ellipsis;
}
img {
    width: 100%;
    height: auto;
    border-radius: 4px;
    background-image: url("@/assets/pico-48.png");
    background-origin: center;
    background-size: cover;
}
.stats {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
}
</style>
