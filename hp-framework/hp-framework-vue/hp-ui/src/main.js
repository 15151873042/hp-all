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
import './permission' // 路由拦截器

import { download } from '@/utils/request'
import { getDicts } from "@/api/system/dict/data"
import {getConfigKey} from "@/api/system/config"
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from "@/utils/ruoyi"

// 字典数据组件

// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree

Vue.config.productionTip = false

Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
