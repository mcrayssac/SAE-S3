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
    path: '/association',
    name: 'associationVue',
    component: () => import('../views/public/association/association')
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
