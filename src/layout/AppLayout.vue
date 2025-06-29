<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<script setup >
import { onMounted, provide, ref } from 'vue'
import { RouterView } from 'vue-router'

const userInfo = ref(null) // Состояние с данными о пользователе

// Функция, которая сохраняет данные о пользователе в состояние и ЛС
function setUserInfo(value) {
  userInfo.value = value
  try {
    localStorage.setItem('userInfo', JSON.stringify(value))
  } catch (e) {
    console.error('ошибка:', e)
    return null
  }
}

// Функция, которая удаляет данные о пользователе из состояния и ЛС
function removeUserInfo() {
  userInfo.value = null
  try {
    localStorage.removeItem('userInfo')
  } catch (e) {
    console.error('ошибка:', e)
  }
}

// Передаем наши данные во всё приложение:
// на главную страницу, на страницы входа и регистрации
provide('auth', {
  userInfo,
  setUserInfo,
  removeUserInfo,
})
console.log('Provided auth:', {
  userInfo,
  setUserInfo,
  removeUserInfo,
})

onMounted(() => {
  try {
    const data = localStorage.getItem('userInfo')
    console.log(data)
    if (data) userInfo.value = JSON.parse(data)
  } catch (e) {
    userInfo.value = null
    console.error('ошибка:', e)
  }
})
</script>
