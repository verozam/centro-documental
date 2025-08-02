import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/verify-code',
    name: 'VerifyCode',
    component: () => import('../pages/VerifyCode.vue')
  },
  {
    path: '/first-time-password',
    name: 'FirstTimePassword',
    component: () => import('../pages/FirstTimePassword.vue')
  },
  {
    path: '/password-recovery',
    name: 'PasswordRecovery',
    component: () => import('../pages/PasswordRecovery.vue')
  },
  {
    path: '/admin',
    children: [
      {
        path: 'home',
        name: 'AdminHome',
        component: () => import('../pages/dashboard/Home.vue')
      },
      {
        path: 'documents',
        name: 'AdminDocuments',
        component: () => import('../pages/dashboard/Documents.vue')
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('../pages/dashboard/Users.vue')
      },
      {
        path: 'reports',
        name: 'AdminReports',
        component: () => import('../pages/dashboard/Reports.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
