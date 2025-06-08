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
  }, 5000)
})
</script>

<style scoped>
.loading {
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-size: 65px;
  font-weight: bold;
  color: transparent;
  background: linear-gradient(
    90deg,
    #0d47a1 20%,
    #4494e4 40%,
    #0d47a1 60%
  );
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  animation: wave 2s linear infinite;
  position: relative;
  display: inline-block;
}

/* Анимация волны по тексту */
@keyframes wave {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Точки в конце */
.loader::after {
  content: '...';
  position: absolute;
  right: -60px; /* отступ справа от текста */
  top: 0;
  font-size: 64px;
  color: #0d47a1;
  animation: dots 1.5s steps(4, end) infinite;
}

/* Анимация появления точек */
@keyframes dots {
  0%,
  20% {
    content: '';
    opacity: 0;
  }
  40% {
    content: '.';
    opacity: 1;
  }
  60% {
    content: '..';
    opacity: 1;
  }
  80%,
  100% {
    content: '...';
    opacity: 1;
  }
}
.main {
  width: 100%;
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
</style>
