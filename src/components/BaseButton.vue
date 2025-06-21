<template>
  <button :class="['button', type ?? 'primary']">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  fullWidth: {
    require: false,
    type: Boolean,
  },
  type: String,
})
</script>

<style scoped>
button,
._btn {
  cursor: pointer;
  outline: none;
}
</style>
