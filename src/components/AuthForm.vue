<template>
  <div class="wrapper">
    <div class="container-auth">
      <div class="modal">
        <div class="modal__block">
          <div class="modal__ttl">
            <h2>{{ isSignUp ? 'Регистрация' : 'Вход' }}</h2>
          </div>
          <form class="modal__form-login" id="formLogUp" action="#" @submit="handleSubmit">
            <BaseInput
              :class="{ error: errors.name }"
              v-show="isSignUp"
              class="modal__input name"
              type="text"
              name="name"
              id="name"
              placeholder="Имя"
              v-model="formData.name"
            />
            <BaseInput
              :class="{ error: errors.login }"
              class="modal__input"
              type="text"
              name="login"
              id="formlogin"
              placeholder="Эл. почта"
              v-model="formData.login"
            />
            <BaseInput
              :class="{ error: errors.password }"
              class="modal__input"
              type="password"
              name="password"
              id="formpassword"
              placeholder="Пароль"
              v-model="formData.password"
            />
            <p v-show="error" class="error-text">{{ error }}</p>

            <BaseButton
              :disabled="isButtonDisabled"
              :class="{ disabled: isButtonDisabled }"
              class="modal__btn-enter _hover01"
              id="btnEnter"
            >
              {{ isSignUp ? 'Зарегистрироваться' : 'Войти' }}
            </BaseButton>

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
import { computed, inject, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from './BaseInput.vue'
import BaseButton from './BaseButton.vue'

const { setUserInfo } = inject('auth')

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

const isSubmitted = ref(false)

function isFormValid() {
  if (props.isSignUp && !formData.value.name.trim()) return false
  if (!formData.value.login.trim()) return false
  if (!formData.value.password.trim()) return false
  return true
}

function validateForm() {
  let isValid = true
  error.value = ''

  errors.value.name = false
  errors.value.login = false
  errors.value.password = false

  if (props.isSignUp && !formData.value.name.trim()) {
    errors.value.name = true
    isValid = false
  }

  if (!formData.value.login.trim()) {
    errors.value.login = true
    isValid = false
  }

  if (!formData.value.password.trim()) {
    errors.value.password = true
    isValid = false
  }

  if (!isValid) {
    error.value = 'Пожалуйста, заполните все обязательные поля'
  }

  return isValid
}

const isButtonDisabled = computed(() => {
  if (!isSubmitted.value) return false
  return !isFormValid()
})

async function handleSubmit(event) {
  event.preventDefault()
  isSubmitted.value = true

  if (!validateForm()) {
    return
  }

  try {
    const data = props.isSignUp
      ? await signUp(formData.value)
      : await signIn({ login: formData.value.login, password: formData.value.password })
    if (data) {
      setUserInfo(data)
      router.push('/')
    }
  } catch (err) {
    error.value = err.message || 'Ошибка при авторизации'
  }
}

watch(formData, () => {
  if (isSubmitted.value) {
    isSubmitted.value = false
  }
})
</script>

<style lang="scss" scoped>
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
.modal__btn-enter.disabled,
.modal__btn-enter:disabled {
  background-color: #94a6be !important;
  color: #ffffff !important;
  cursor: not-allowed !important;
  box-shadow: none !important;
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
.error {
  border: 1px solid red;
}

.error-text {
  color: red;
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
/* Темная тема для модального окна авторизации */
body.dark-theme .container-auth {
  background-color: #121212; /* или другой очень тёмный фон */
  color: #e0e0e0; /* если надо, чтобы текст вне формы тоже был светлым */
}

body.dark-theme .modal {
  background-color: #121212;
}

body.dark-theme .modal__block {
  background-color: #1e1e1e;
  border: 1px solid rgba(100, 100, 120, 0.6);
  border-radius: 10px;
  /* Объёмная дымка вокруг формы */
  box-shadow:
    0 0 15px 5px rgba(30, 30, 30, 0.6),    /* тёмный мягкий ореол */
    0 8px 24px rgba(0, 0, 0, 0.8),          /* глубокая тень снизу */
    inset 0 0 10px rgba(255, 255, 255, 0.05); /* очень лёгкий внутренний свет */
  transition: box-shadow 0.3s ease;
}
body.dark-theme .modal__block:hover {
  box-shadow:
    0 0 25px 8px rgba(30, 30, 30, 0.8),
    0 12px 36px rgba(0, 0, 0, 0.9),
    inset 0 0 15px rgba(255, 255, 255, 0.1);
}

body.dark-theme .modal__ttl h2 {
  color: #FFFFFF;
}

body.dark-theme .modal__input {
  background-color: #2c2c2c;
  border-color: #555;
  color: #FFFFFF;

  &::placeholder {
    color: #94A6BE;
  }
}

body.dark-theme .modal__input.error {
  border-color: red;
}

body.dark-theme .modal__btn-enter {
  background-color: #565EEF;
  color: #FFFFFF;
  border: none;

  &.disabled,
  &:disabled {
    background-color: #94A6BE!important;
    color: #f0f0f0 !important;
    cursor: not-allowed !important;
    box-shadow: none !important;
  }
}

body.dark-theme .modal__btn-enter._hover01:hover:not(.disabled):not(:disabled) {
  background-color: #94A6BE;
  color: #f0f0f0;
}

body.dark-theme .modal__form-group p,
body.dark-theme .modal__form-group a {
  color: FFFFFF;
}

body.dark-theme .error-text {
  color: #ff6b6b;
}

</style>
