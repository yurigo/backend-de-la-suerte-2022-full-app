<script setup>
    import { ref, defineProps , computed } from 'vue'
    const props = defineProps(['user'])
    const oro = computed(() => props.user.oro?.aggregate?.count || 0 )
    const pico = computed(() => props.user.hits?.aggregate?.count || 0 )
</script>

<template>

    <div class="minero">
        <div class="display-name"> {{ props.user.displayName }} </div>
        <img :src="props.user.avatarUrl" :alt="props.user.id" />
        <div class="stats">
        <div>🥇 {{ oro }} </div>
        <div>⛏ {{ pico }} </div>
        </div>
    </div>

</template>

<style scoped>

.minero{
    width: 150px;
}
.display-name{
    width:100%;
    overflow: hidden;
    font-weight: 100;
    font-size: 1.3rem;
    text-align: center;
    margin-bottom: .5rem;
    text-overflow: ellipsis;
}
img{
    width: 100%;
    height: auto;
    border-radius: 4px;
    background-image: url('@/assets/pico-48.png');
    background-origin: center;
    background-size: cover;
}
.stats{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;

}
</style>
