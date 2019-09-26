import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon

import { keycloak } from '@/utils/authenticate'

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

keycloak.init({ onLoad: 'login-required' }).success(auth => {
  if (!auth) {
    console.log("erreur de l'authentification")
  }
  const roles = keycloak.resourceAccess.vue !== undefined ? keycloak.resourceAccess.vue.roles : []
  store.commit('user/SET_ROLES', roles)
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
})
