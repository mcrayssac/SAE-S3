import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/mainHome.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test.vue')
  },
  {
    path: '/association',
    name: 'association',
    component: () => import('../views/association/association.vue')
  },
  {
    path: '/clubs',
    name: 'clubs',
    component: () => import('../views/prestataire/clubs/clubs.vue')
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: () => import('../views/prestataire/restaurants/restaurants.vue')
  },
  {
    path: '/jdadijonbasket',
    name: 'jdadijonbasket',
    component: () => import('../views/prestataire/prestataires/prestataireComponent.vue')
  },
    // At the end
  {
    path: '*',
    name: 'error',
    component: () => import('../views/error404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
