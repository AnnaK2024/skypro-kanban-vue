<template>
  <main>
    <BaseHeader />
    <TaskContent :loading="loading"  :tasks="tasks" :error="error" />
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ref, provide, inject, watch } from 'vue'
import { fetchTask, postTask } from '@/services/api'

import BaseHeader from '@/components/BaseHeader.vue'
import TaskContent from '@/components/TaskContent.vue'

const loading = ref(true)
const tasks = ref([])
const error = ref('')

const { userInfo } = inject('auth')

const getTasks = async () => {
  if (!userInfo.value?.token) return
  try {
    
    const data = await fetchTask({
      token: userInfo.value.token,
    })
    if (data) tasks.value = data
  } catch (err) {
    error.value = err.message || String(err)
  } finally {
    loading.value = false
  }
}

async function addTask(newTask) {
  try {
    newTask.status = 'Без статуса'
    if (!userInfo.value?.token) throw new Error('Нет токена')
    const updatedTasks = await postTask({ token: userInfo.value.token, task: newTask })
    tasks.value = updatedTasks
  } catch (e) {
    error.value = e.message || String(e)
  }
}

provide('tasksData', { tasks, loading, error, addTask })

watch(userInfo, getTasks, { immediate: true })
</script>

<style lang="scss" scoped>
body.dark-theme .main {
  background: #20202C;
}</style>
