import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: () => import('@/views/index/index')
    },
    {
      path: '/home',
      component: () => import('@/views/home/index')
    }
  ]
})