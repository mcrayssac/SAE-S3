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
    path: '/devenirPrestataire',
    name: 'devenirPrestataire',
    component: () => import('../views/public/formulaire_devenir_prestataire.vue')
  },
  {
    path: '/categories/:nomCategorie',
    name: 'categories/nomCategorie',
    component: () => import('../views/prestataire/prestataires/categories.vue')
  },
  {
    path: '/prestataires/:nomPrestataire',
    name: 'prestataires/nomPrestataire',
    component: () => import('../views/prestataire/prestataires/prestataire.vue')
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
