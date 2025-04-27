<template>
  <main>
    <ExitModal />
    <BaseHeader />
    <NewCardModal />
    <BaseTask />
    <div class="main">
      <div class="container">
        <div class="main__block">
          <div class="main__content">
            <div v-if="loading" class="loading">Данные загружаются...</div>
            <div v-else class="columns">
              <TaskColumn
                v-for="status in statuses"
                :key="status"
                :status="status"
                :tasks="filteredTasks(status)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseTask from '@/components/BaseTask.vue'
import ExitModal from '@/components/ExitModal.vue'
import NewCardModal from '@/components/NewCardModal.vue'
import TaskColumn from '@/components/TaskColumn.vue'
import { onMounted, ref } from 'vue'
import { tasks } from './mocks/tasks'

const loading = ref(true)
const statuses = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово']

const filteredTasks = (status) => {
  return tasks.filter((task) => task.status === status)
}

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<style scoped>
.loading {
  text-align: center;
  font-size: 1.5em;
  margin: 20px;
}

.columns {
  display: flex;
}
</style>
