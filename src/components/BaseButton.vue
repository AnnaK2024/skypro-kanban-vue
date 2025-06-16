<template>
  <button :class="['button', type ?? 'primary']">
    <RouterLink to="/">
      <slot></slot>
    </RouterLink>
  </button>
</template>

<script setup>
defineProps({
  type: String,
})
</script>

<style scoped></style>
