import AppLayout from '@/layout/AppLayout.vue'
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
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          children: [
            {
              path: '/newCard',
              name: 'newCard',
              component: () => import('@/views/NewCardView.vue'),
            },
            {
              path: '/card/:id',
              name: 'card',
              component: () => import('@/views/EditTaskView.vue'),
            },
            {
              path: '/exit',
              name: 'exit',
              component: () => import('@/views/ExitView.vue'),
            },
            {
              path: '/:pathMatch(.*)*',
              component: NotFoundView,
            },
          ],
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/sign-in',
          component: SignInView,
        },
        {
          path: '/sign-up',
          component: SignUpView,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  // Берем токен
  const token = localStorage.getItem('userInfo')

  // Проверяем, действительно ли на маршруте нужна авторизация и есть ли токен
  if (to.meta.requiresAuth && !token) {
    next('/sign-in') // Если нет, уводим на страницу входа
  } else {
    next() // Иначе пропускаем пользователя
  }
})

export default router
