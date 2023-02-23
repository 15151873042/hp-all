import Vue from 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css

import App from './App.vue'
import store from './store'
import router from './router'
import plugins from "@/plugins";

import './assets/icons' // icon组件全局注册
import './permission' // 路由拦截器

import { download } from '@/utils/request'
import { getDicts } from "@/api/system/dict/data"
import {getConfigKey} from "@/api/system/config"
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from "@/utils/ruoyi"

// 分页组件
import Pagination from "@/components/Pagination";
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar";
// 字典数据组件
import DictData from "@/components/DictData";


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


// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)

Vue.config.productionTip = false


Vue.use(plugins)
DictData.apply()



Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
