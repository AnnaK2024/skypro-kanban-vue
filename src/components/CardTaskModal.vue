<!-- Редактирование задачи из карточки -->
<template>
  <div class="pop-browse">
    <div class="pop-browse__container">
      <div class="pop-browse__block">
        <div class="pop-browse__content">
          <div class="pop-browse__top-block">
            <h3 class="pop-browse__ttl">{{task.title || 'Название задачи'  }}</h3>
            <div class="categories__theme theme-top _orange _active-category" :class="getThemeClass(task.topic)">
              <p>{{ task.topic || 'Без категории' }}</p>
            </div>
          </div>

          <!-- Статус -->
          <div class="pop-browse__status status">
            <p class="status__p subttl">Статус</p>

            <!-- Режим просмотра: показываем только текущий статус -->
            <div v-if="!isEditing" class="status__themes">
              <div class="status__theme _gray _selected">
                <p>{{ task.statusLabel || 'Без статуса' }}</p>
              </div>
            </div>

            <!-- Режим редактирования: показываем все статусы -->
            <div v-else class="status__themes">
              <div
                v-for="(statusItem, index) in allStatuses"
                :key="index"
                class="status__theme"
                :class="{
                  _selected: editableTask.status === statusItem.value,
                  _clickable: true,
                }"
                @click="selectStatus(statusItem.value)"
              >
                <p :class="editableTask.status === statusItem.value ? '_selected-text' : ''">
                  {{ statusItem.label }}
                </p>
              </div>
            </div>
          </div>

          <!-- Описание и календарь -->
          <div class="pop-browse__wrap">
            <form class="pop-browse__form form-browse" id="formBrowseCard" @submit.prevent>
              <div class="form-browse__block">
                <label for="textArea01" class="subttl">Описание задачи</label>
                <textarea
                  class="form-browse__area"
                  name="text"
                  id="textArea01"
                  :readonly="!isEditing"
                  placeholder="Введите описание задачи..."
                  v-model="editableTask.description"
                ></textarea>
              </div>
            </form>

            <!-- Предполагается, что BaseCalendar умеет принимать v-model для даты -->
            <BaseCalendar v-model="editableTask.date" :disabled="!isEditing" />
          </div>

          <!-- Кнопки просмотра -->
          <div v-if="!isEditing" class="pop-browse__btn-browse">
            <div class="btn-group">
              <BaseButton class="btn-browse__edit _btn-bor _hover03" @click="startEditing"
                >Редактировать задачу</BaseButton
              >
              <BaseButton class="btn-browse__delete _btn-bor _hover03" @click="deleteTask"
                >Удалить задачу</BaseButton
              >
            </div>
            <RouterLink to="/">
              <BaseButton class="btn-browse__close _btn-bg _hover01">Закрыть</BaseButton>
            </RouterLink>
          </div>

          <!-- Кнопки редактирования -->
          <div v-else class="pop-browse__btn-edit">
            <div class="btn-group">
              <BaseButton class="btn-edit__edit _btn-bg _hover01" @click="saveChanges"
                >Сохранить</BaseButton
              >
              <BaseButton class="btn-edit__edit _btn-bor _hover03" @click="cancelEditing"
                >Отменить</BaseButton
              >
              <BaseButton class="btn-edit__delete _btn-bor _hover03" @click="deleteTask"
                >Удалить задачу</BaseButton
              >
            </div>
            <RouterLink to="/">
              <BaseButton class="btn-edit__close _btn-bg _hover01">Закрыть</BaseButton>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { computed, inject, reactive, ref} from 'vue'
import BaseCalendar from './BaseCalendar.vue'
import BaseButton from './BaseButton.vue'

import { deleteTaskAPI, editTask} from '@/services/api'
import router from '@/router'

const route = useRoute()

const { tasks } = inject('tasksData')
const { userInfo } = inject('auth')

const id = route.params.id
console.log(id) // должен показать id из URL

const isEditing = ref(false)

// Все возможные статусы задачи
const allStatuses = [
  { label: 'Без статуса', value: '' },
  { label: 'Нужно сделать', value: 'todo' },
  { label: 'В работе', value: 'inProgress' },
  { label: 'Тестирование', value: 'testing' },
  { label: 'Готово', value: 'done' },
]

// Получаем текущую задачу из списка
const statusLabelsMap = {
  '': 'Без статуса',
  todo: 'Нужно сделать',
  inProgress: 'В работе',
  testing: 'Тестирование',
  done: 'Готово',
}

const task = computed(() => {
  const t = tasks.value.find((t) => t._id === route.params.id)
  if (!t) {
    return {
      topic: '',
      title: '',
      status: '',
      description: '',
      date: null,
      statusLabel: 'Без статуса',
    }
  }
  return {
    ...t,
    statusLabel: statusLabelsMap[t.status] || 'Без статуса',
  }
})

// Редактируемая копия задачи
const editableTask = reactive({
  title: '',
  topic: '',
  status: '',
  description: '',
  date: null,
})

// При входе в режим редактирования копируем данные
const startEditing = () => {
  editableTask.title = task.value.title
  editableTask.topic = task.value.topic
  editableTask.status = task.value.status || ''
  editableTask.description = task.value.description || ''
  editableTask.date = task.value.date || null
  isEditing.value = true
}

// Выбор статуса при редактировании
const selectStatus = (statusValue) => {
  editableTask.status = statusValue
}

// Отмена изменений
const cancelEditing = () => {
  isEditing.value = false
}

const saveChanges = async () => {
  try {
    console.log('Отправляем обновлённую задачу:', {
      token: userInfo.value.token,
      id: route.params.id,
      task: editableTask,
    });

    const updatedTask = await editTask({
      token: userInfo.value.token,
      id: route.params.id,
      task: {
        title: editableTask.title,
        topic: editableTask.topic,
        status: editableTask.status,
        description: editableTask.description,
        date: editableTask.date,
      },
    });

    console.log('Получена обновлённая задача:', updatedTask);

    tasks.value = tasks.value.map(t => t._id === updatedTask._id ? updatedTask : t);
    isEditing.value = false;
  } catch (error) {
    console.error('Ошибка при сохранении изменений:', error);
  }
}

// Удаление задачи
const deleteTask = async () => {
  try {
    await deleteTaskAPI({
      token: userInfo.value.token,
      id: route.params.id,
    })
    // Удаляем задачу из списка
    tasks.value = tasks.value.filter((t) => t._id !== route.params.id)
    // Переходим на главную страницу
    router.push('/')
  } catch (error) {
    console.error('Ошибка при удалении задачи:', error.message)
  }
}

const getThemeClass = (topic) => {
  switch (topic) {
    case 'Research':
      return '_green'
    case 'Web Design':
      return '_orange'
    case 'Copywriting':
      return '_purple'
    default:
      return ''
  }
}
</script>

<style scoped>
.pop-browse {
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 375px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;
}
.pop-browse__container {
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
.pop-browse__block {
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  position: relative;
}
.pop-browse__content {
  display: block;
  text-align: left;
}
.pop-browse__content .categories__theme {
  opacity: 1;
}
.pop-browse__content .theme-down {
  display: none;
  margin-bottom: 20px;
}
.pop-browse__content .theme-top {
  display: block;
}
.pop-browse__top-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.pop-browse__ttl {
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
}
.pop-browse__wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.pop-browse__form {
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
}
.pop-browse__btn-browse,
.pop-browse__btn-edit {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
}
.pop-browse__btn-browse button,
.pop-browse__btn-edit button {
  height: 30px;
  margin-bottom: 10px;
  padding: 0 14px;
}
.pop-browse__btn-browse .btn-group button,
.pop-browse__btn-edit .btn-group button {
  margin-right: 8px;
}
.form-browse__block {
  display: flex;
  flex-direction: column;
}
.form-browse__area {
  max-width: 370px;
  width: 100%;
  outline: none;
  padding: 14px;
  background: #eaeef6;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: 14px;
  height: 200px;
}
.form-browse__area::-moz-placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: #94a6be;
  letter-spacing: -0.14px;
}
.form-browse__area::placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: #94a6be;
  letter-spacing: -0.14px;
}
.status {
  margin-bottom: 11px;
}
.status__p {
  margin-bottom: 14px;
}
.status__themes {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
}
.status__theme {
  border-radius: 24px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  color: #94a6be;
  padding: 11px 14px 10px;
  margin-right: 7px;
  margin-bottom: 7px;
}
.status__theme p {
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
}
.status__theme._selected {
  background-color: #94a6be;
  border-color: #94a6be;
  color: white;
  cursor: default;
}

.status__theme._selected p,
.status__theme._selected-text {
  color: white !important;
}

.status__theme._clickable {
  cursor: pointer;
}
._btn-bor {
  border-radius: 4px;
  border: 0.7px solid var(--palette-navy-60, #565eef);
  outline: none;
  background: transparent;
  color: #565eef;
}
._btn-bor a {
  color: #565eef;
}

._btn-bg {
  border-radius: 4px;
  background: #565eef;
  border: none;
  outline: none;
  color: #ffffff;
}
._btn-bg a {
  color: #ffffff;
}

._hide {
  display: none;
}

._dark {
  display: none;
}
.pop-browse:target {
  display: block;
}
@media screen and (max-width: 660px) {
  .pop-browse {
    top: 70px;
  }
  .pop-browse__container {
    padding: 0;
    justify-content: flex-start;
  }
  .pop-browse__block {
    border-radius: 0;
  }
  .pop-browse__wrap {
    display: block;
  }
}
@media screen and (max-width: 495px) {
  .pop-browse__block {
    padding: 20px 16px 32px;
  }
  .pop-browse__content .theme-down {
    display: block;
    margin-bottom: 20px;
  }
  .pop-browse__content .theme-top {
    display: none;
  }
  .pop-browse__form {
    max-width: 100%;
  }
  .pop-browse__calendar {
    width: 100%;
  }
  .pop-browse__btn-browse button,
  .pop-browse__btn-edit button {
    width: 100%;
    height: 40px;
  }
  .pop-browse__btn-browse .btn-group,
  .pop-browse__btn-edit .btn-group {
    width: 100%;
  }
  .pop-browse__btn-browse .btn-group button,
  .pop-browse__btn-edit .btn-group button {
    margin-right: 0px;
  }
  .form-browse__area {
    max-width: 100%;
  }
  .form-browse__area {
    height: 37px;
  }
}
</style>
