<template>
  <main>
    <RouterView />
    <BaseHeader />
    <div>
      <CardLoader v-if="loading" />
      <TaskContent v-else :tasks="tasks" :error="error" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseHeader from '@/components/BaseHeader.vue'
import TaskContent from '@/components/TaskContent.vue'

import { ref, onMounted } from 'vue'
import { fetchTask } from '@/services/api'
import CardLoader from '@/components/CardLoader.vue'

const loading = ref(false)
const tasks = ref([])
const error = ref('')

const getTasks = async () => {
  try {
    loading.value = true
    const data = await fetchTask({
      token: 'bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck',
      // Поскольку авторизация не реализована, передаем токен вручную
    })

    if (data) tasks.value = data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(getTasks)
</script>

<style scoped></style>
