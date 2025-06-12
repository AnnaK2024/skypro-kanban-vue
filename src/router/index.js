import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children : [
      {
        path: '/card/id',
        name: 'card',
        component: () => import('@/views/EditTask.vue'),
      },
      {
        path: '/card/add',
        name: 'card/add',
        component: () => import('@/views/NewCardModal.vue'),
      },
      {
        path: '/exit',
        name: 'exit',
        component: () => import('@/views/ExitModal.vue'),
      },
      ]
    },
    {
      path: '/sign-in', // Маршрут для страницы входа
      component: SignInView, // Отдельный компонент для авторизации
    },
    {
      path: '/sign-up', // Маршрут для страницы регистрации
      component: SignUpView, // Экран, позволяющий создать аккаунт
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundView,
    },
  ],
    meta: {
      requiresAuth: true, // Главная страница требует авторизации
   },
})

router.beforeEach((to, from, next) => {
   // Берем токен
   const token = localStorage.getItem('userInfo');

   // Проверяем, действительно ли на маршруте нужна авторизация и есть ли токен
   if (to.meta.requiresAuth && !token) {
      next('/sign-in'); // Если нет, уводим на страницу входа
   } else {
      next(); // Иначе пропускаем пользователя
   }
});

export default router
