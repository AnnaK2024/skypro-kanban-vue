import axios from 'axios'

export const API_URL = 'https://wedev-api.sky.pro/api/kanban'

function getErrorMessage(error) {
  if (error.response) {
    // Сервер ответил с кодом ошибки
    const status = error.response.status
    const data = error.response.data
    return `Ошибка сервера: ${status} - ${data.message || JSON.stringify(data)}`
  } else if (error.request) {
    // Запрос был сделан, но ответа нет
    return 'Нет ответа от сервера. Проверьте соединение.'
  } else {
    // Другая ошибка
    return error.message
  }
}

export async function fetchTask({ token }) {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: 'Bearer ' + token,
        // 'Content-Type' можно убрать, если не нужен
      },
    })
    return response.data.tasks
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export async function postTask({ token, task }) {
  try {
    const response = await axios.post(API_URL, task, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': '',
      },
    })
    return response.data.tasks
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export async function getTask({ token, id }) {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return response.data
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export async function editTask({ token, id, task }) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, task, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': '',
      },
    })
    return response.data
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export async function deleteTaskAPI({ token, id }) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return response.data.tasks
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}
