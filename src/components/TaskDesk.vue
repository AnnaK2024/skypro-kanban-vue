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
            <div v-if="loading">
              <CardLoader />
            </div>
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
import { ref, onMounted } from 'vue'

import BaseHeader from '@/components/BaseHeader.vue'
import BaseTask from '@/components/BaseTask.vue'
import ExitModal from '@/components/ExitModal.vue'
import NewCardModal from '@/components/NewCardModal.vue'
import TaskColumn from '@/components/TaskColumn.vue'

import { tasks } from './mocks/tasks'
import CardLoader from './CardLoader.vue'

const loading = ref(true)
const statuses = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово']

const filteredTasks = (status) => {
  return tasks.filter((task) => task.status === status)
}

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 3000)
})
</script>

<style scoped>
.no-tasks {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  padding: 20px 0;
}
.main {
  width: 100%;
  height: 100vh;
  background-color: #eaeef6;
}
.container {
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
}
.main__block {
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;
}
.main__content {
  width: 100%;
}
.columns {
  display: flex;
  flex-wrap: wrap;
}

/* Skeleton styles */
.skeleton {
  background-color: #ddd;
  border-radius: 4px;
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;
}

.skeleton::after {
  content: '';
  position: absolute;
  top: 0;
  left: -150px;
  height: 100%;
  width: 150px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: loading 1.5s infinite;
}

.skeleton-title {
  width: 80%;
  height: 24px;
  margin-bottom: 16px;
}

.skeleton-task {
  width: 100%;
  height: 48px;
  margin-bottom: 12px;
  border-radius: 6px;
}

.column-skeleton {
  flex: 1 1 18%;
  margin-right: 20px;
  background: #f5f7fa;
  padding: 16px;
  border-radius: 8px;
  box-sizing: border-box;
  min-width: 180px;
}

@keyframes loading {
  0% {
    left: -150px;
  }
  100% {
    left: 100%;
  }
}
</style>
