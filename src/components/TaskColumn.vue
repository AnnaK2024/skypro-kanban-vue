<template>
  <div class="main__column">
    <div class="column__title">
      <p>{{ status }}</p>
    </div>
    <div class="cards">
      <div v-for="card in tasks" :key="card.id">
        <TaskCard :card="card" />
      </div>
    </div>
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue'

defineProps({
  status: { type: String, required: true },
  tasks: { type: Array, required: true },
})
</script>

<style scoped></style>
