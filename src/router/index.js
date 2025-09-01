import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from '@/layouts/AppLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { getCookie } from '@/utils/storageManager'
import { faMasksTheater } from '@fortawesome/free-solid-svg-icons'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/DashBoard.vue'),
        meta: {
          // pageAccess: ['admin', 'reviewer', 'creator'],
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    meta: { requiresGuest: true },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/Login.vue'),
        meta: { requiresAuth: false },
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const user = getCookie('user_data') || {
    is_authenticated: false,
    user_data: {},
  }
  console.log(user)
  const isAuthenticated = user.is_authenticated

  /**Check if page requires login  and user is not login */
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
    // next({ name: 'unauthorized' })
  } else if (to.meta.requiresGuest && isAuthenticated) {
    /**Check if page doest require login and user is authenticated */
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
