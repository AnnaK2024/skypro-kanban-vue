<template>
  <div class="wrapper">
    <div class="container-auth">
      <div class="modal">
        <div class="modal__block">
          <div class="modal__ttl">
            <h2>{{ isSignUp ? 'Регистрация' : 'Вход' }}</h2>
          </div>
          <form class="modal__form-login" id="formLogUp" action="#" @submit="handleSubmit">
            <div class="modal__input">
              <BaseInput
                :class="{ error: errors.first - name }"
                v-show="isSignUp"
                class="modal__input name"
                type="text"
                name="name"
                id="formname"
                placeholder="Имя"
                v-model="formData.name"
                @focus="clearError('first-name')"
              />
              <BaseInput
                :class="{ error: errors.login }"
                type="text"
                name="login"
                id="formlogin"
                placeholder="Эл. почта"
                v-model="formData.login"
                @focus="clearError('login')"
              />
              <BaseInput
                :class="{ error: errors.password }"
                type="password"
                name="password"
                id="formpassword"
                placeholder="Пароль"
                v-model="formData.password"
                @focus="clearError('password')"
              />
              <p v-show="error" class="error-text">{{ error }}</p>
            </div>

            <button class="modal__btn-enter _hover01" id="btnEnter">
              <a href="../main.html">Войти</a>
            </button>
            <div class="modal__form-group">
              <p>{{ isSignUp ? 'Уже есть аккаунт?' : 'Нужно зарегистрироваться?' }}</p>
              <RouterLink :to="isSignUp ? '/sign-in' : '/sign-up'">{{
                isSignUp ? 'Войдите здесь' : 'Регистрируйтесь здесь'
              }}</RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { signIn, signUp } from '@/services/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from './BaseInput.vue'

const router = useRouter()
const props = defineProps({
  isSignUp: Boolean,
})

const formData = ref({
  name: '',
  login: '',
  password: '',
})

const errors = ref({
  name: false,
  login: false,
  password: false,
})

const error = ref('')

function validateForm() {
  let isValid = true
  error.value = ''

  // Сбросим все ошибки
  errors.value.name = false
  errors.value.login = false
  errors.value.password = false

  // Проверка имени (только для регистрации)
  if (props.isSignUp && !formData.value.name.trim()) {
    errors.value.name = true
    isValid = false
  }

  // Проверка логина (эл. почты)
  if (!formData.value.login.trim()) {
    errors.value.login = true
    isValid = false
  }

  // Проверка пароля
  if (!formData.value.password.trim()) {
    errors.value.password = true
    isValid = false
  }

  // Если есть ошибки, установим общее сообщение
  if (!isValid) {
    error.value = 'Пожалуйста, заполните все обязательные поля'
  }

  return isValid
}

async function handleSubmit(event) {
  event.preventDefault()
  // Валидация формы перед отправкой
  if (!validateForm()) {
    return
  }

  try {
    const data = props.isSignUp
      ? await signUp(formData.value)
      : await signIn({ login: formData.value.login, password: formData.value.password })
    if (data) {
      localStorage.setItem('userInfo', JSON.stringify(data))
      router.push('/')
    }
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #eaeef6;
}
.container-auth {
  display: block;
  width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
}
.modal {
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal__block {
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 368px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
}
.modal__ttl h2 {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.6px;
  margin-bottom: 20px;
}
.modal__form-login {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & input:not(:last-child) {
    margin-bottom: 7px;
  }
}
.modal__input {
  width: 100%;
  min-width: 100%;
  border-radius: 8px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  outline: none;
  padding: 10px 8px;

  &::placeholder {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.28px;
    color: #94a6be;
  }
}
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
.modal__form-group {
  text-align: center;

  & p,
  a {
    color: rgba(148, 166, 190, 0.4);
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.14px;
  }

  & a {
    text-decoration: underline;
  }
}

@media screen and (max-width: 375px) {
  .modal {
    background-color: #ffffff;

    &__block {
      max-width: 368px;
      width: 100%;
      padding: 0 16px;
      border-radius: none;
      border: none;
      box-shadow: none;
    }

    &__btn-signup-ent {
      height: 40px;
    }
    &__btn-enter {
      height: 40px;
    }
  }
}
</style>
