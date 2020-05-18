import Vue from 'vue'
import App from './App.vue'
import '@/plugins/element.js'
import axios from 'axios'

import toastRegistry from '@/toast/index'
Vue.use(toastRegistry)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

import router from './router'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
