<template>
  <tasks />

  <div>
    <main class="main">
      <div class="container">
        <div v-if="loading" class="loading">Данные загружаются...</div>
        <div v-else>
          <div class="main__block">
            <div v-for="status in statuses" :key="status">
              <div class="column__title">
                <p>{{ status }}</p>
              </div>
              <div class="cards">
                <div v-for="card in filteredTasks(status)" :key="card.id">
                  <TaskCard :card="card" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { tasks } from './mocks/tasks'
import TaskCard from './TaskCard.vue'


defineProps({
  loading: Boolean,
})

const statuses = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово']

const filteredTasks = (status) => {
  return tasks.filter((task) => task.status === status)
}
</script>

<style lang="scss" scoped></style>
