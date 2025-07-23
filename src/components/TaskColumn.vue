<template>
  <div class="main__column">
    <div class="column__title">
      <p>{{ statusLabel }}</p>
    </div>
    <div>
      <div v-for="card in tasks" :key="card._id">
        <TaskCard :card="card" />
      </div>
    </div>
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue';

defineProps({
  status: String,
  statusLabel: String,
  tasks: Array,
})
</script>

<style lang="scss" scoped>
.main__column {
  width: 20%;
  margin: 0 auto;
  display: block;
}
.column__title {
  padding: 0 10px;
  margin: 15px 0;
}
.column__title p {
  color: #94a6be;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
}
@media screen and (max-width: 1200px) {
  .main__column {
    width: 100%;
    margin: 0 auto;
    display: block;
  }
}
</style>
