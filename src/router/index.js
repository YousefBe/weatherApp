import { createRouter, createWebHistory } from 'vue-router'
import AddCity from '../views/AddCity.vue'
import Weather from '../views/Weather.vue'

const routes = [
  {
    path: '/',
    name: 'AddCity',
    component: AddCity
  },
  {
    path: '/weather/:city',
    name: 'Weather',
    component: Weather,
    props:true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
