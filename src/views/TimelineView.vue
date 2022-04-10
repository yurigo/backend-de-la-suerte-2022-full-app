<script setup>
import { ref, reactive, onMounted,  watch, onUpdated, nextTick } from "vue";
// import nhost from "@/nhost";
import gql from "graphql-tag";
import { useSubscription } from "@vue/apollo-composable";

import { RouterLink, useRouter } from "vue-router";

import Navigation from "../components/Navigation.vue";
import Timeline from "../components/Timeline.vue";
import router from "../router";

let hits = ref([]);
let debug = ref(false);
let limit = ref(0);

const { result } = await useSubscription(gql`
    subscription MySubscription($limit: Int = 100) {
      mina_pico(order_by: {en: desc}, limit: $limit) {
        en
        user {
          avatarUrl
          displayName
        }
        oro
      }
    }
`,
{limit: limit}
);

watch(
    result,
    async (newValue) => {
        hits.value = newValue.mina_pico;
    }
);


async function more(entries, observer) {
    
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    // este callback se ejecuta dos veces: cuando el objeto entra en el viewport y cuando sale
    // por lo que hay que controlar que no se ejecute dos veces (entry.isIntersecting)

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            limit.value += 100;
        }
    });
}

const infinityScroll = ref();

onMounted(() => {
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

        <div class="fixed bottom-10 right-10 middle">Mostrando {{ limit }}</div>

        <Timeline :hits="hits"></Timeline>

        <div class="h-[20vh] pt-20 text-center">
            <svg class="animate-spin h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
        
        <div id="infinityScroll" ref="infinityScroll"></div>
    </main>
</template>

<style scoped>

</style>
