<template>
  <button :class="['button', type ?? 'primary']" class="modal__btn-enter _hover01">
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

<style scoped>
.modal__btn-enter {
  width: 100%;
  height: 30px;
  background-color: #565eef;
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: #ffffff;

  & a {
    width: 100%;
    height: 100%;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
