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
        path: 'categorias',
        name: 'AdminCategories',
        component: () => import('../pages/dashboard/AdminCategory.vue')
      },
      {
        path: 'subcategorias',
        name: 'AdminSubCategories',
        component: () => import('../pages/dashboard/SubCategory.vue')
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('../pages/dashboard/UsersList.vue')
      },
      {
        path: 'adduser',
        name: 'AddUsers',
        component: () => import('../pages/dashboard/AddUsers.vue')
      },
      {
        path: 'edituser',
        name: 'EditUsers',
        component: () => import('../pages/dashboard/EditUsers.vue')
      },
      {
        path: 'reports',
        name: 'AdminReports',
        component: () => import('../pages/dashboard/Reports.vue')
      },
      {
        path: 'dependenciesdoc',
        name: 'AdminDependencies',
        component: () => import('../pages/dashboard/DependenciesDoc.vue')
      },
      {
        path: 'dependenciesdocedit',
        name: 'AdminDependenciesEdit',
        component: () => import('../pages/dashboard/DependenciesEdit.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
