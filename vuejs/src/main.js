import Vue from 'vue'
import App from './App.vue'
import router from './router/routes'
import store from './store'
import { BootstrapVue, IconsPlugin, BIcon } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueEllipseProgress from 'vue-ellipse-progress';
Vue.use(VueEllipseProgress);

import AOS from 'aos'
import 'aos/dist/aos.css'

import * as VueAos from 'vue-aos'
Vue.use(VueAos);

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.component('BIcon', BIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    AOS.init();
  },
  render: h => h(App)
}).$mount('#app')
