<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<script setup>
import { onMounted, provide, ref } from 'vue'
import { RouterView } from 'vue-router'

const userInfo = ref(null)

function setUserInfo(value) {
  userInfo.value = value
  try {
    localStorage.setItem('userInfo', JSON.stringify(value))
  } catch (e) {
    console.error('ошибка:', e)
    return null
  }
}

function removeUserInfo() {
  userInfo.value = null
  try {
    localStorage.removeItem('userInfo')
  } catch (e) {
    console.error('ошибка:', e)
  }
}

provide('auth', {
  userInfo,
  setUserInfo,
  removeUserInfo,
})

onMounted(() => {
  try {
    const data = localStorage.getItem('userInfo')

    if (data) userInfo.value = JSON.parse(data)
  } catch (e) {
    userInfo.value = null
    console.error('ошибка:', e)
  }
})
</script>

<style lang="scss" scoped></style>
