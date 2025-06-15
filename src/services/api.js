import axios from "axios"

const API_URL = 'https://wedev-api.sky.pro/api/kanban'  
// Эта переменная содержит базовый URL для запросов к нашему серверу

export async function fetchTask({ token }) {  

   try {  
      // Здесь начинается попытка сделать запрос
      const data = await axios.get(API_URL, {
         headers: {
            Authorization: 'Bearer ' + token,
         },
      })
      return data.data.tasks
      // Возвращаем именно data.data,
      // потому что библиотека axios кладет полезную нагрузку внутрь ключа data
   } catch (error) {
      // В случае ошибки выбрасываем исключение с сообщением
      throw new Error(error.message)
   }
}

export async function postTask({ token, task }) {  
   try {  
      // Пробуем отправить данные на сервер
      const data = await axios.post(API_URL, task, {
         headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': '',
         },
      })
   // Возвращаем обновленный список задач
   return data.data.tasks
   } catch (error) {
      // Если что-то пошло не так, пробрасываем ошибку дальше
      throw new Error(error.message)
   }
}

export async function getTask({ token, id }) {
   try {
      // Пытаемся получить карточку задачи по ее id на сервере
      const data = await axios.get(API_URL + id, {
         headers: {
            Authorization: 'Bearer ' + token,
         },
      })
   // Возвращаем обновленную карточку задачи
   return data.data
   } catch (error) {
      // Пробрасываем ошибку, чтобы обработать ее в вызывающем коде
      throw new Error(error.message)
   }
}

export async function editTask({ token, id, task }) {
   try {
      // Пытаемся изменить карточку задачи на сервере
      const data = await axios.put(API_URL + id, task, {
         headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': '',
         },
      })
   // Возвращаем обновленную карточку задачи
   return data.data.tasks
   } catch (error) {
      // Пробрасываем ошибку, чтобы обработать ее в вызывающем коде
      throw new Error(error.message)
   }
}

export async function deleteTask({ token, id }) {
   try {
      // Пытаемся получить карточку по ее id на сервере
      const data = await axios.delete(API_URL + id, {
         headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': '',
         },
      })
   // Возвращаем обновленный список задач
   return data.data.tasks
   } catch (error) {
      // Пробрасываем ошибку, чтобы обработать ее в вызывающем коде
      throw new Error(error.message)
   }
}