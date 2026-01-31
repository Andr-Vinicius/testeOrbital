import { createRouter, createWebHistory } from 'vue-router'
import ProductsList from '../pages/products/list.vue'
import ProductsCreate from '../pages/products/create.vue'
import Login from '../pages/Login.vue'

const routes = [
  {
    path: '/products',
    name: 'products',
    component: ProductsList,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/create',
    name: 'productsCreate',
    component: ProductsCreate,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/'); 
  } else {
    next(); 
  }
});

export default router
