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
    path: '/test_giu',
    name: 'test_giu',
    component: () => import('../views/test_giu.vue')
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
    path: '/etatInscription',
    name: 'etatInscription',
    component: () => import('../views/prestataire/etatInscription.vue')
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import('../views/public/courses/courses.vue')
  },
  {
    path: '/demandesPrestataires',
    name: 'demandesPrestataires',
    component: () => import('../views/organisateur/demandesPrestataires.vue')
  },
  {
    path: '/voirCoursesOrientation',
    name: 'voirCoursesOrientation',
    component: () => import('../views/classementCourses.vue')
  },
  {
    path: '/categories/:nomCategorie',
    name: 'categories/nomCategorie',
    component: () => import('../views/prestataire/prestataires/categories.vue')
  },
  {
    path: '/resultats/:nomCompetition',
    name: '/resultats/nomCompetition',
    component: () => import('../views/public/resultats/resultats.vue')
  },
  {
    path: '/prestataires/:nomPrestataire',
    name: 'prestataires/nomPrestataire',
    component: () => import('../views/prestataire/prestataires/prestataire.vue')
  },
  {
    path: '/signup',
    name:'signup',
    component: () => import('../views/signup/signup.vue')
  },
  {
    path: '/map',
    name:'map',
    component: () => import('../views/maps/mapPublicPresta.vue')
  },
  {
    path: '/map/orga',
    name: 'map/orga',
    component: () => import('../views/maps/mapOrga.vue')
  },
  {
    path: '/scene',
    name: 'scene',
    component: () => import('../components/Planning.vue')
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

const DEFAULT_TITLE = 'Lakeside Sports Festival';
router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router
