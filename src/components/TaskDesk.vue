<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseTask from '@/components/BaseTask.vue'
import ExitModal from '@/components/ExitModal.vue'
import NewCardModal from '@/components/NewCardModal.vue'
import TaskColumn from '@/components/TaskColumn.vue'
</script>

<template>
  <main>
    <ExitModal />
    <BaseHeader />
    <NewCardModal />
    <BaseTask />
    <TaskColumn />
  </main>
</template>
