<template>
  <a
    href="#user-set-target"
    class="header__user _hover02"
    @click.prevent="toggleModal"
    ref="buttonRef"
  >
    {{ userName }}
  </a>
  <div class="header__pop-user-set pop-user-set" v-if="isModalVisible" ref="modalRef">
    <p class="pop-user-set__name">{{ userName || 'Имя не указано' }}</p>
    <p class="pop-user-set__mail">{{ userLogin }}</p>
    <div class="pop-user-set__theme">
      <p>Темная тема</p>
      <input
        type="checkbox"
        class="checkbox"
        name="checkbox"
        v-model="isDarkTheme"
        id="theme-toggle"
      />
      <label for="theme-toggle" class="visually-hidden"></label>
    </div>
    <RouterLink to="/exit">
      <BaseButton class="_hover03">Выйти</BaseButton>
    </RouterLink>
  </div>
</template>

<script setup>
import { ref, inject, computed, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import BaseButton from './BaseButton.vue'

const auth = inject('auth')

const isModalVisible = ref(false)
const toggleModal = () => {
  isModalVisible.value = !isModalVisible.value
}

const userName = computed(() => auth?.userInfo?.value?.name || 'Профиль')
const userLogin = computed(() => auth?.userInfo?.value?.login || 'email@example.com')

// refs для элементов
const modalRef = ref(null)
const buttonRef = ref(null)

const onClickOutside = (event) => {
  const modalEl = modalRef.value
  const buttonEl = buttonRef.value
  if (!modalEl || !buttonEl) return

  // если клик вне модалки и вне кнопки — закрываем модалку
  if (!modalEl.contains(event.target) && !buttonEl.contains(event.target)) {
    isModalVisible.value = false
  }
}

// --- Тема ---
const isDarkTheme = ref(false)

onMounted(() => {
  const savedTheme = localStorage.getItem('dark-theme')
  if (savedTheme === 'true') {
    isDarkTheme.value = true
    document.body.classList.add('dark-theme')
  }
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})

watch(isDarkTheme, (newVal) => {
  if (newVal) {
    document.body.classList.add('dark-theme')
  } else {
    document.body.classList.remove('dark-theme')
  }
  localStorage.setItem('dark-theme', newVal)
})
</script>

<style lang="scss" scoped>
.header__user {
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: #565eef;
}
.header__user::after {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 1px;
  border-left: 1.9px solid #565eef;
  border-bottom: 1.9px solid #565eef;
  transform: rotate(-45deg);
  margin: -6px 0 0 5px;
  padding: 0;
}
.header__pop-user-set {
  display: block;
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  height: 205px;
  border-radius: 10px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  background: #fff;
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
  padding: 34px;
  text-align: center;
  z-index: 2;
}
.header__pop-user-set.active {
  display: block;
}
.pop-user-set__name {
  color: #000;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 4px;
}
.pop-user-set__mail {
  color: #94a6be;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 10px;
}
.pop-user-set__theme {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}
.pop-user-set__theme p {
  color: #000;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
}
.pop-user-set__theme input[type='checkbox'] {
  position: relative;
  width: 24px;
  height: 13px;
  border-radius: 100px;
  background: #eaeef6;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.pop-user-set__theme input[type='checkbox']::before {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: #94a6be;
  transition: 0.5s;
}
.pop-user-set__theme input:checked[type='checkbox']::before {
  left: 12px;
}
.pop-user-set button {
  width: 72px;
  height: 30px;
  background-color: #f5f7fa;
  color: #565eef;
  border-radius: 4px;
  border: 1.5px solid #565eef;
  box-shadow:
    inset 2px 2px 5px rgba(255, 255, 255, 0.9),
    inset -2px -2px 5px rgba(150, 150, 150, 0.3);
  transition:
    box-shadow 0.3s ease,
    background-color 0.3s ease;

  &:hover {
    background-color: #565eef;
    color: #ffffff;
    box-shadow:
      inset 2px 2px 5px rgba(30, 60, 255, 0.9),
      inset -2px -2px 5px rgba(10, 20, 150, 0.8);
  }
}
.pop-user-set button a {
  color: #565eef;
}
.pop-user-set:target {
  display: block;
}
._hover03:hover {
  background-color: #565eef;
  color: white;
}
._hover03:active {
  background-color: #565eef;
  color: white;
  outline: none;
}

body.dark-theme .header__user._hover02 {
  color: #ffffff;
}

body.dark-theme .header__user._hover02::after {
  border-color: #ffffff;
}

body.dark-theme .header__pop-user-set {
  background-color: #20202c;
  border: 1px solid #3a4a6d;
  border-radius: 10px;
  color: #cdd9e5;
  box-shadow:
    0 0 10px 3px rgba(58, 74, 109, 0.7),
    0 4px 12px rgba(26, 38, 72, 0.8);
  background-image: radial-gradient(circle at center, rgba(58, 74, 109, 0.3), transparent 70%);
}

body.dark-theme .pop-user-set__name {
  color: #ffffff;
}

body.dark-theme .pop-user-set__mail {
  color: #94a6be;
}

body.dark-theme .pop-user-set__theme p {
  color: #ffffff;
}

body.dark-theme .pop-user-set__theme input[type='checkbox'] {
  background: #ffffff;
}

body.dark-theme .pop-user-set__theme input[type='checkbox']::before {
  background-color: #565eef;
}

body.dark-theme .pop-user-set button {
     background-color: transparent;
    border-color: #5a6efb;
    color: #aab8ff;

    &:hover,
    &._hover03:hover {
      background-color: #5a6efb;
      color: #ffffff;
    }
}

</style>
