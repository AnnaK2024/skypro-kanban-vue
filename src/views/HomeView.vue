<template>
  <main>
    <BaseHeader />
    <CardLoader v-if="loading" />
    <TaskContent v-else :tasks="tasks" :error="error" />
    <RouterView />
  </main>
</template>

<script setup >
import { RouterView } from 'vue-router'
import { ref, provide, inject, watch } from 'vue'
import { fetchTask } from '@/services/api'

import BaseHeader from '@/components/BaseHeader.vue'
import TaskContent from '@/components/TaskContent.vue'
import CardLoader from '@/components/CardLoader.vue'

const loading = ref(false)
const tasks = ref([])
const error = ref('')

// Здесь нам потребуется токен из коробки auth
const {userInfo} = inject('auth')

// Передаём всем потомкам главной страницы данные о словах, загрузке и ошибке
provide('tasksData', { tasks, loading, error })

const getTasks = async () => {
  console.log(userInfo)
  if (!userInfo.value?.token) return
  try {
    loading.value = true

    const data = await fetchTask({
      token: userInfo.value.token
    })
    console.log(data)
    if (data) tasks.value = data
  } catch (err) {
    error.value = err.message || String(err)
  } finally {
    loading.value = false
  }
}

watch(userInfo, getTasks, {immediate: true})
</script>

<style scoped></style>
