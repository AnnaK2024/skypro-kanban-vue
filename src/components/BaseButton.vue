<template>
   <button
      :class="['button', type ?? 'primary']">
      <slot></slot>
   </button>
</template>

<script setup>
defineProps({
  type: String,
})
</script>

<style scoped></style>
