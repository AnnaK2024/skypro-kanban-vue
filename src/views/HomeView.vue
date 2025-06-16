<template>
  <main>
    <RouterView />
    <BaseHeader />
    <TaskContent :loading="loading" :taskArray="taskArray" :error="error" />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseHeader from '@/components/BaseHeader.vue';
import TaskContent from '@/components/TaskContent.vue';

import { ref, onMounted} from 'vue'
import { fetchTask } from '@/services/api'

const loading = ref(false)
// ref(false) - флажок, показывающий, что идёт загрузка
const taskArray  = ref([])
// ref([]) - массив для задач 
const error = ref('')  
// ref('') - строка для текста ошибки

const getTasks = async () => {  
   try {  
      loading.value = true  
      const data = await fetchTask({  
      token: 'bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck',  
      // Поскольку авторизация не реализована, передаем токен вручную
   })  

   if (data) taskArray.value = data  

   } catch (err) {  
      error.value = err.message  

   } finally {  
      loading.value = false  
   }  
}  

// При успешном запросе сохраняем данные в taskArray
// При ошибке записываем её в error
// В любом случае переводим загрузку в false

onMounted(getTasks)

</script>

<style scoped></style>
