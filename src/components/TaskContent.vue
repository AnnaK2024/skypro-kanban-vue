<template>
  <div class="main">
    <div class="container">
      <div class="main__block">
        <div class="main__content">
          <div v-if="!hasTasks" class="no-tasks">Задач нет</div>
          <div v-else class="columns">
            <TaskColumn
              v-for="status in statuses"
              :key="status.value"
              :status="status.value"
              :statusLabel="status.label"
              :tasks="filteredTasks(status.value)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TaskColumn from '@/components/TaskColumn.vue'
import { computed } from 'vue'

const props = defineProps({
  tasks: { type: Array, require: true },
  loading: Boolean,
  erorr: String,
})

const statuses = [
  { label: 'Без статуса', value: 'Без статуса' },
  { label: 'Нужно сделать', value: 'todo' },
  { label: 'В работе', value: 'inProgress' },
  { label: 'Тестирование', value: 'testing' },
  { label: 'Готово', value: 'done' },
]

const filteredTasks = (status) => {
  return props.tasks.filter((task) => task.status === status)
}

const hasTasks = computed(() => props.tasks.length > 0)
</script>

<style scoped>
.main {
  width: 100%;
  height: auto;
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
  background: linear-gradient(270deg, #565eef, #5b5e86, #bbbdee);
  background-size: 600% 600%;
  background-clip: text;
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
