<template>
  <div class="cards__card card">
    <div class="card__group">
      <div class="card__theme" :class="getThemeClass(card.topic)">
        <p>{{ card.topic }}</p>
      </div>
      <a href="#popBrowse" target="_self">
        <div class="card__btn">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </a>
    </div>
    <div class="card__content">
      <a :href="card.link" target="_blank">
        <h3 class="card__title">{{ card.title }}</h3>
      </a>
      <div class="card__date">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
        >
          <g clip-path="url(#clip0_1_415)">
            <path
              d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z"
              stroke="#94A6BE"
              stroke-width="0.8"
              stroke-linejoin="round"
            />
            <path
              d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z"
              stroke="#94A6BE"
              stroke-width="0.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_1_415">
              <rect width="13" height="13" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p>{{ card.date }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// Определяем свойства компонента
const { card } = defineProps({
  card: {
    type: Object,
    required: true,
  },
})

// Функция для получения класса темы карточки
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

<style scoped></style>
