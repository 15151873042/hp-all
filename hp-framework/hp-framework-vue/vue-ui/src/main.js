import Vue from 'vue'

import Cookies from 'js-cookie'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


import App from './App.vue'
import store from './store'



Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium' // 设置element-ui默认尺寸信息
})



Vue.config.productionTip = false




new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
