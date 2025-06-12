<template>
  <div class="wrapper">
    <div class="container-auth">
      <div class="modal">
        <div class="modal__block">
          <div class="modal__ttl">
            <h2>{{ isSignUp ? 'Регистрация' : 'Вход' }}</h2>
          </div>
          <form @submit.prevent="handleSubmit" class="modal__form-login" :id="isSignUp ? 'formSignUp' : 'formSignIn'">
            <template v-if="isSignUp">
              <input
                v-model="signUpData.firstName"
                class="modal__input first-name"
                type="text"
                name="first-name"
                id="first-name"
                placeholder="Имя"
                required
              />
              <input
                v-model="signUpData.email"
                class="modal__input login"
                type="email"
                name="email"
                id="emailSignUp"
                placeholder="Эл. почта"
                required
              />
              <input
                v-model="signUpData.password"
                class="modal__input password-first"
                type="password"
                name="password"
                id="passwordSignUp"
                placeholder="Пароль"
                required
              />
              <button type="submit" class="modal__btn-signup-ent _hover01">
                Зарегистрироваться
              </button>
              <div class="modal__form-group">
                <p>
                  Уже есть аккаунт?
                  <button type="button" class="link-button" @click="toggleForm">Войдите здесь</button>
                </p>
              </div>
            </template>

            <template v-else>
              <input
                v-model="signInData.email"
                class="modal__input"
                type="email"
                name="email"
                id="emailSignIn"
                placeholder="Эл. почта"
                required
              />
              <input
                v-model="signInData.password"
                class="modal__input"
                type="password"
                name="password"
                id="passwordSignIn"
                placeholder="Пароль"
                required
              />
              <button type="submit" class="modal__btn-enter _hover01">
                Войти
              </button>
              <div class="modal__form-group">
                <p>
                  Нужно зарегистрироваться?
                  <button type="button" class="link-button" @click="toggleForm">Регистрируйтесь здесь</button>
                </p>
              </div>
            </template>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isSignUp = ref(false)

const signUpData = ref({
  firstName: '',
  email: '',
  password: '',
})

const signInData = ref({
  email: '',
  password: '',
})

function toggleForm() {
  isSignUp.value = !isSignUp.value
}

function handleSubmit() {
  if (isSignUp.value) {
    // Логика регистрации
    console.log('Регистрация:', signUpData.value)
    // Здесь можно добавить валидацию, запрос на сервер и т.д.
    alert(`Регистрация успешна для ${signUpData.value.email}`)
  } else {
    // Логика входа
    console.log('Вход:', signInData.value)
    // Аналогично: валидация, запрос на сервер и т.п.
    alert(`Вход выполнен для ${signInData.value.email}`)
  }
}
</script>

<style scoped>
.wrapper {
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: #f1f1f1;
}
.container-auth {
  max-width: 400px;
  margin: 0 auto;
}

.modal {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.modal__ttl h2 {
  margin-bottom: 1.5rem;
  text-align: center;
}

.modal__input {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal__btn-signup-ent,
.modal__btn-enter {
  width: 100%;
  padding: 0.75rem;
  background-color: #2f80ed;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 1rem;
  transition: background-color 0.3s ease;
}

.modal__btn-signup-ent:hover,
.modal__btn-enter:hover {
  background-color: #1366d6;
}

.modal__form-group {
  text-align: center;
  font-size: 0.9rem;
}

.modal__form-group p {
  margin: 0;
}

.link-button {
  background: none;
  border: none;
  color: #2f80ed;
  cursor: pointer;
  padding: 0;
  font: inherit;
  text-decoration: underline;
}

.link-button:hover {
  color: #1366d6;
}
</style>
