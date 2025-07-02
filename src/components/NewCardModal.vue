<template>
  <div class="pop-new-card" v-if="isVisible">
    <div class="pop-new-card__container" @click="closeOnBackdropClick">
      <div class="pop-new-card__block">
        <div class="pop-new-card__content">
          <h3 class="pop-new-card__ttl">Создание задачи</h3>
          <RouterLink to="/"><div class="pop-new-card__close">&#10006;</div></RouterLink>
          <div class="pop-new-card__wrap">
            <form class="pop-new-card__form form-new" id="formNewCard" action="#">
              <div class="form-new__block">
                <label for="formTitle" class="subttl">Название задачи</label>
                <input
                  ref="titleInput"
                  class="form-new__input"
                  type="text"
                  name="name"
                  id="formTitle"
                  placeholder="Введите название задачи..."
                  v-model="form.title"
                />
              </div>
              <div class="form-new__block">
                <label for="textArea" class="subttl">Описание задачи</label>
                <textarea
                  class="form-new__area"
                  name="text"
                  id="textArea"
                  placeholder="Введите описание задачи..."
                  v-model="form.description"
                ></textarea>
              </div>
            </form>
            <BaseCalendar v-model="form.date" />
          </div>
          <div class="pop-new-card__categories categories">
            <p class="categories__p subttl">Категория</p>
            <div class="categories__themes">
              <div
                class="categories__theme _orange"
                :class="{ '_active-category': form.topic === 'Web Design' }"
                @click="selectCategory('Web Design')"
              >
                <p class="_orange">Web Design</p>
              </div>
              <div
                class="categories__theme _green"
                :class="{ '_active-category': form.topic === 'Research' }"
                @click="selectCategory('Research')"
              >
                <p class="_green">Research</p>
              </div>
              <div
                class="categories__theme _purple"
                :class="{ '_active-category': form.topic === 'Copywriting' }"
                @click="selectCategory('Copywriting')"
              >
                <p class="_purple">Copywriting</p>
              </div>
            </div>
          </div>
          <BaseButton class="form-new__create _hover01" id="btnCreate" @click.prevent="createTask">
            Создать задачу
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, nextTick, reactive, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import BaseCalendar from './BaseCalendar.vue'
import BaseButton from './BaseButton.vue'

const tasksData = inject('tasksData')
const addTask = tasksData?.addTask

const isVisible = ref(false)
const titleInput = ref(null)
const route = useRoute()
const router = useRouter()

const form = reactive({
  title: '',
  description: '',
  topic: 'Web Design',
  date: null,
})

watch(
  () => route.path,
  async (newPath) => {
    isVisible.value = newPath === '/newCard'
    if (isVisible.value) {
      await nextTick()
      titleInput.value?.focus()
    }
  },
  { immediate: true },
)

function selectCategory(topic) {
  form.topic = topic
}

function createTask() {
  if (!form.title.trim()) {
    alert('Название задачи обязательно')
    return
  }

  if (!form.description.trim()) {
    alert('Описание задачи обязательно')
    return
  }

  const due = new Date(form.date)
  if (!form.date || isNaN(due.getTime())) {
    alert('Пожалуйста, выберите дату исполнения задачи')
    return
  }

  const newTask = {
    id: Date.now(),
    title: form.title.trim(),
    description: form.description.trim(),
    topic: form.topic,
    date: form.date,
    status: 'Без статуса',
  }

  if (addTask) {
    addTask(newTask)
  } else {
    console.warn('addTask не найден')
  }

  form.title = ''
  form.description = ''
  form.topic = 'Web Design';
  (form.date = null), router.push('/')
}

function closeOnBackdropClick(event) {
  if (event.target === event.currentTarget) {
    router.push('/')
  }
}
</script>

<style lang="scss" scoped>
.pop-new-card {
  display: block;
  width: 100%;
  min-width: 375px;
  height: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;
}
.pop-new-card__container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
}
.pop-new-card__block {
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 48px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  position: relative;
}
.pop-new-card__content {
  display: block;
  text-align: left;
}
.pop-new-card__ttl {
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 20px;
}
.pop-new-card__close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: #94a6be;
  cursor: pointer;
}
.pop-new-card__close:hover {
  color: #000000;
}
.pop-new-card__wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.pop-new-card__form {
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
}
.form-new__block {
  display: flex;
  flex-direction: column;
}
.form-new__input,
.form-new__area {
  width: 100%;
  outline: none;
  padding: 14px;
  background: transparent;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
}
.form-new__input::-moz-placeholder,
.form-new__area::-moz-placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: #94a6be;
  letter-spacing: -0.14px;
}
.form-new__input::placeholder,
.form-new__area::placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: #94a6be;
  letter-spacing: -0.14px;
}
.form-new__input {
  margin: 20px 0;
}
.form-new__area {
  max-width: 370px;
  margin-top: 14px;
  height: 200px;
}
.form-new__create {
  width: 132px;
  height: 30px;
  background-color: #565eef;
  border-radius: 4px;
  border: 0;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: #ffffff;
  float: right;
}
.pop-new-card:target {
  display: block;
}
body.dark-theme {
  .pop-new-card__container {
    background: rgba(20, 20, 30, 0.5);
  }

  .pop-new-card__block {
    background-color: #20202c;
    border: 1px solid #3a4a6d;
    border-radius: 10px;
    color: #cdd9e5;
    box-shadow:
      0 0 10px 3px rgba(58, 74, 109, 0.7),
      0 4px 12px rgba(26, 38, 72, 0.8);
    background-image: radial-gradient(circle at center, rgba(58, 74, 109, 0.3), transparent 70%);
  }

  .pop-new-card__ttl {
    color: #ffffff;
  }

  .pop-new-card__close {
    color: #20202c;
    transition: color 0.3s ease;
  }
  .pop-new-card__close:hover {
    color: #ffffff;
  }

  .pop-new-card__wrap {
    color: #f8f8f2;
  }

  .pop-new-card__form {
    color: #ffffff;
  }

  .form-new__input,
  .form-new__area {
    background-color: #20202c;
    border: 0.7px solid #4e5566;
    color: #f8f8f2;
  }
  .form-new__input::placeholder,
  .form-new__area::placeholder {
    color: #94a6be;
  }
  .form-new__input::-moz-placeholder,
  .form-new__area::-moz-placeholder {
    color: #94a6be;
  }

  .form-new__input:focus,
  .form-new__area:focus {
    border-color: #565eef;
    box-shadow: 0 0 5px 1px rgba(204, 204, 204, 0.5);
    outline: none;
    background-color: #3b3b5c;
    color: #f8f8f2;
  }
  .form-new__create {
    background-color: #565eef;
    color: #f8f8f2;
    border: none;
    transition: background-color 0.3s ease;
  }
  .form-new__create:hover {
    background-color: #3b3b5c;
    border: 0.7px solid #565eef;
    color: #f8f8f2;
  }
}
@media screen and (max-width: 660px) {
  .pop-new-card {
    top: 70px;
  }
  .pop-new-card__container {
    padding: 0;
    justify-content: flex-start;
  }
  .pop-new-card__block {
    border-radius: 0;
  }
  .pop-new-card__wrap {
    display: block;
  }
}
@media screen and (max-width: 495px) {
  .pop-new-card__container {
    padding: 0;
    justify-content: flex-start;
  }
  .pop-new-card__block {
    padding: 20px 16px 32px;
  }
  .pop-new-card__form {
    max-width: 100%;
    width: 100%;
    display: block;
  }
  .pop-new-card__calendar {
    width: 100%;
  }
  .form-new__area {
    max-width: 100%;
    height: 34px;
  }
  .form-new__create {
    width: 100%;
    height: 40px;
  }
}
</style>
