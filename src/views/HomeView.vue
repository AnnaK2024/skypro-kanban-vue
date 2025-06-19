<template>
  <main>
    <BaseHeader />
    <CardLoader v-if="loading" />
    <TaskContent v-else :tasks="tasks" :error="error" />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseHeader from '@/components/BaseHeader.vue'
import TaskContent from '@/components/TaskContent.vue'

import { ref, onMounted } from 'vue'
import { fetchTask } from '@/services/api'
import CardLoader from '@/components/CardLoader.vue'

const loading = ref(true)
const tasks = ref([])
const error = ref('')

const getTasks = async () => {
  try {
    loading.value = true
    const token= localStorage.getItem('userInfo') || ''

    const data = await fetchTask({
      token,
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
