import Vue from 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css

import App from './App.vue'
import store from './store'
import router from './router'

import './assets/icons' // icon组件全局注册
import './permission'

Vue.config.productionTip = false

Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
