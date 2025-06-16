<template>
  <input
    class="input"
    :type="type"
    :name="name"
    :id="id"
    :placeholder="placeholder"
    v-model="model"
  />
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
})
// defineProps() позволяет этому компоненту получать все нужные данные
// для каждого поля ввода (id, name, placeholder, type)

const model = defineModel()
// Эта строка говорит компоненту, что оно будет использоваться с v-model
</script>

<style scoped></style>
