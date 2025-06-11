<template>
  <div class="kanban-board">
    <div class="kanban-column" v-for="(column, index) in columns" :key="index">
      <h2 class="column-title">{{ column.title }}</h2>
      <div class="card-list">
        <div class="card-skeleton" v-for="i in column.cardCount" :key="i">
          <div class="skeleton-header">
            <div class="skeleton-line long"></div>
            <div class="skeleton-line short"></div>
          </div>
          <div class="skeleton-line content"></div>
          <div class="skeleton-line footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CardLoader',
  setup() {
    const columns = [
      { title: 'Без статуса', cardCount: 5 },
      { title: 'Нужно сделать', cardCount: 1 },
      { title: 'В работе', cardCount: 3 },
      { title: 'Тестирование', cardCount: 1 },
      { title: 'Готово', cardCount: 1 },
    ]

    return {
      columns,
    }
  },
})
</script>

<style scoped>
.kanban-board {
  display: flex;
  flex-wrap: wrap;
}
.kanban-column {
  width: 20%;
  margin: 0 auto;
  display: block;
}
.column-title {
  color: #94a6be;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.card-skeleton {
  width: 220px;
  height: 130px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;
}
.skeleton-line {
  background: linear-gradient(90deg, #C1CDDC 25%, #E9EEF7 50%, #C1CDDC 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}
@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
.skeleton-header {
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.skeleton-line.long {
  width: 82px;
  height: 20px;
  border-radius: 18px;
}
.skeleton-line.short {
  width: 18px;
  height: 4px;
}

.skeleton-line.content {
  width: 113px;
  height: 13px;
  margin-bottom: 10px;
}

.skeleton-line.footer {
  width: 58px;
  height: 13px;
  margin-top: 30px;
}

</style>
