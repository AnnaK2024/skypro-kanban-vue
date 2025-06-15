<template>
  <main>
    <RouterView />
    <BaseHeader />
    <NewCardModal />
    <CardTaskModal/>
    <EditTask />
    <ExitModal />
    <div class="main">
      <div class="container">
        <div class="main__block">
          <div class="main__content">
            <div v-if="loading">
              <CardLoader />
            </div>
            <div v-else>
              <div v-if="!hasTasks" class="no-tasks">Задач нет</div>
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
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

import BaseHeader from '@/components/BaseHeader.vue'
import NewCardModal from '@/components/NewCardModal.vue'
import CardTaskModal from '@/components/CardTaskModal.vue'
import EditTask from '@/components/CardTaskModal.vue'
import TaskColumn from '@/components/TaskColumn.vue'
import ExitModal from '@/components/ExitModal.vue'

import { tasks } from './mocks/tasks'
import CardLoader from './CardLoader.vue'
import { RouterView } from 'vue-router'


const loading = ref(true)
const statuses = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово']

const filteredTasks = (status) => {
  return tasks.filter((task) => task.status === status)
}

const hasTasks = computed(() => tasks.length > 0)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<style scoped>
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
.no-tasks {
  text-align: center;
  font-size: 4rem;
  font-weight: bold;
  background: linear-gradient(270deg, #8f98a3, #ced3dc, #a6bdda);
  background-size: 600% 600%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 5s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
