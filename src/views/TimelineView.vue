<script setup>
import { ref, reactive, onMounted } from "vue";
import nhost from "@/nhost";
import gql from "graphql-tag";

import { RouterLink, useRouter } from "vue-router";

import Navigation from "../components/Navigation.vue";
import Timeline from "../components/Timeline.vue";
import router from "../router";

let hits = ref([]);
let debug = ref(false);

let limit = 100;

async function getData(limit) {
    const QUERY = `
query MyQuery($limit: Int = 100) {
  mina_pico(order_by: {en: desc}, limit: $limit) {
    en
    user {
      avatarUrl
      displayName
    }
    oro
  }
}`;

    const response = await nhost.graphql.request(QUERY, { limit });
    return response.data.mina_pico;
}

hits.value = await getData(limit);

// como no funcionan las suscripciones hago un polling de los mineros cada ¿3 segundos?
setInterval(async () => {
    hits.value = await getData(limit);
}, 3000);

async function more() {
    limit += 100;
    hits.value = await getData(limit);
}

const infinityScroll = ref(null); // template ref

onMounted(() => {
    console.log(infinityScroll.value);
    const ob = new IntersectionObserver(more);
    ob.observe(infinityScroll.value);
});
</script>

<template>
    <Navigation />
    <main>
        <code v-if="debug">
            <pre>{{ JSON.stringify(miners, null, 2) }}</pre>
        </code>

        <Timeline :hits="hits"></Timeline>

        <!-- <div class="mina">
            <Miner
                v-for="miner in miners"
                :user="miner"
                :key="miner.id"
            ></Miner>
        </div>

        <button @click="mineralismo">
            <img src="@/assets/pico-48.png" alt="" />
        </button> -->

        <div id="infinityScroll" ref="infinityScroll"></div>

        <!-- <button @click="more">
            <img src="@/assets/pico-48.png" alt="" />
        </button> -->
    </main>
</template>

<style scoped>
code {
    font-size: 0.7em;
}

.mina {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    gap: 1rem;
}

button {
    position: fixed;
    bottom: 10rem;
    left: 50%;
    height: 73px;
    width: 350px;
    background-color: #f7f7f7;
    border-style: none;
    border-radius: 10px;
    font-size: 2rem;
    border: 5px solid #517699;
    cursor: pointer;
    transform: translateX(-50%);
}
button:hover {
    background-color: #517699;
    color: #517699;
}
button:active {
    border-color: #8aafd1;
    background-color: #8aafd1;
    color: #f7f7f7;
}
img {
    top: 5px;
    vertical-align: baseline;
}
</style>
