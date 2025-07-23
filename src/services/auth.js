import axios from "axios";

const API_URL = 'https://wedev-api.sky.pro/api/user';

export async function signIn(userData) {
   try {
      const response = await axios.post(API_URL + "/login", userData, {
         headers: {
            "Content-Type": "",
         },
      });
      return response.data.user;
   } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
         throw new Error(error.response.data.error);
      } else if (error.message) {
         throw new Error(error.message);
      } else {
         throw new Error("Произошла неизвестная ошибка при входе");
      }
   }
}

export async function signUp({ name, login, password }) {
   try {
      const response = await axios.post(
         API_URL,
         { login, name, password },
         {
            headers: {
               "Content-Type": "",
            },
         }
      );
      return response.data.user;
   } catch (error) {
      console.error("Ошибка при регистрации:", error);
      if (error.response && error.response.data && error.response.data.error) {
         throw new Error(error.response.data.error);
      } else if (error.message) {
         throw new Error(error.message);
      } else {
         throw new Error("Произошла неизвестная ошибка при регистрации");
      }
   }
}
