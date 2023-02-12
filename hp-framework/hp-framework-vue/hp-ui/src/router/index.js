import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 公共路由
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error/404'),
        hidden: true
    },

    {
        path: '/',
        component: () => import('@/views/index'),
        hidden: true
    },

    // {
    //     path: '/',
    //     redirect: 'index',
    //     children: [
    //         {
    //             path: 'index',
    //             component: () => import('@/views/index'),
    //         }
    //     ]
    // },

    {
        path: '*',
        redirect: '404',
    },

]


export default new Router({
    mode: 'history', // 去掉url中的#
    routes: constantRoutes
})