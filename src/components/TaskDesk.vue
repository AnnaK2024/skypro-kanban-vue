<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseTask from '@/components/BaseTask.vue'
import ExitModal from '@/components/ExitModal.vue'
import NewCardModal from '@/components/NewCardModal.vue'
import TaskColumn from '@/components/TaskColumn.vue'
import { onMounted, ref } from 'vue'

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 3000)
})
</script>

<template>
  <main>
    <ExitModal />
    <BaseHeader />
    <NewCardModal />
    <BaseTask />
    <TaskColumn :loading="loading" />
  </main>
</template>
