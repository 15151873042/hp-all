import Vue from 'vue'
import App from './App.vue'
import {hunhe, hunhe2} from "@/mixin";

Vue.config.productionTip = false


Vue.mixin(hunhe) // 全局混入
Vue.mixin(hunhe2) // 全局混入

new Vue({
  render: h => h(App),
}).$mount('#app')
