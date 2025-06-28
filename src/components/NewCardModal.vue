<!-- Карточка создания новой задачи -->
<template>
  <div class="pop-new-card" v-if="isVisible">
    <div class="pop-new-card__container">
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
            <BaseCalendar />
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
  dueDate: new Date().toISOString(),
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
  form.topic= topic
  console.log('Selected topic:', topic)
}

function createTask() {
  if (!form.title.trim()) {
    console.log('Creating task with topic:', form.topic)
    alert('Название задачи обязательно')
    return
  }

  const newTask = {
    id: Date.now(),
    title: form.title.trim(),
    description: form.description.trim(),
    topic: form.topic,
    dueDate: form.dueDate,
    status: 'Без статуса',
  }

  if (addTask) {
    addTask(newTask) // вызываем напрямую
  } else {
    console.warn('addTask не найден')
  }

  // Сброс формы
  form.title = ''
  form.description = ''
  form.topic = 'Web Design'
  form.dueDate = new Date().toISOString(),

  router.push('/')
}
</script>

<style scoped>
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
