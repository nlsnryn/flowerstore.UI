import { createRouter, createWebHistory } from 'vue-router'
import { authMiddleware } from './middleware/auth.middleware'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        group: 'landing'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
        group: 'auth'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: {
        group: 'auth'
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/DashboardView.vue'),
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/dashboard/product/:id',
      name: 'product',
      component: () => import('@/views/dashboard/ProductView.vue'),
      props: true,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/dashboard/order-successful',
      name: 'orderSuccess',
      component: () => import('@/views/dashboard/OrderSuccessView.vue'),
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/views/order/OrderView.vue'),
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/product-management',
      name: 'productManagement',
      component: () => import('@/views/product/ProductManagementView.vue'),
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/product-management/add-product',
      name: 'addProduct',
      component: () => import('@/views/product/AddProductView.vue'),
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/product-management/:id/edit-product',
      name: 'editProduct',
      component: () => import('@/views/product/EditProductView.vue'),
      props: true,
      meta: {
        requiredAuth: true
      }
    }
  ]
})

router.beforeEach(authMiddleware)
export default router
