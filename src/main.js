import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as Three from 'three'

Vue.config.productionTip = false
// bootstrap
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(Three)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
