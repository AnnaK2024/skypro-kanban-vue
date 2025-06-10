<template>
  <div class="kanban-board">
    <div
      class="kanban-column"
      v-for="(column, index) in columns"
      :key="index"
    >
      <h2 class="column-title">{{ column.title }}</h2>
      <div class="card-list">
        <div
          class="card-skeleton"
          v-for="i in column.cardCount"
          :key="i"
        >
          <div class="skeleton-line header"></div>
          <div class="skeleton-line content"></div>
          <div class="skeleton-line footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardLoader',
  setup() {
    const columns = [
      { title: 'Без статуса', cardCount: 5 },
      { title: 'Нужно сделать', cardCount: 1 },
      { title: 'В работе', cardCount: 3 },
      { title: 'Тестирование', cardCount: 1 },
      { title: 'Готово', cardCount: 1 },
    ];

    return {
      columns,
    };
  },
});
</script>

<style lang="scss" scoped>
.kanban-board {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}

.kanban-column {
  width: 220px;
  flex-shrink: 0; /* Предотвращает сжатие колонок */
}

.column-title {
  color: #94a6be;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-skeleton {
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.skeleton-line {
  background-color: #e0e0e0;
  height: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
}

.skeleton-line.header {
  width: 70%;
  height: 12px;
}

.skeleton-line.content {
  width: 90%;
}

.skeleton-line.footer {
  width: 50%;
}
</style>

