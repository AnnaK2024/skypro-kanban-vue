<script setup>
import { RouterView } from 'vue-router'
import cards from './components/mocks/tasks'
</script>

<template>
  <RouterView />

  <div v-for="card in cards" :key="card.id">
    <div class="cards__item">
      <h3>{{ card.title }}</h3>
      <p>{{ card.topic }}</p>
      <p>{{ card.date }}</p>
      <p>{{ card.status }}</p>
    </div>
  </div>
</template>

<style scoped></style>
