import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Iniciativas from '../views/Iniciativas.vue'
import Servicios from '../views/Servicios.vue'
import Sub3 from '../views/Sub3.vue'
import Sub4 from '../views/Sub4.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/servicios',
    name: 'Servicios',
    component: Servicios
  },
  {
    path: '/iniciativas',
    name: 'Iniciativas',
    component: Iniciativas
  },
  {
    path: '/sub3',
    name: 'Sub3',
    component: Sub3
  },
  {
    path: '/sub4',
    name: 'Sub4',
    component: Sub4
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
