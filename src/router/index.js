import { createRouter, createWebHistory } from 'vue-router'
import AddCity from '../views/AddCity.vue'

const routes = [
  {
    path: '/',
    name: 'AddCity',
    component: AddCity
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
