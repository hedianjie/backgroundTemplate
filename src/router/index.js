import Vue from "vue"
import Router from "vue-router"

Vue.use(Router);

/**
 * 其余路由在登陆成功后动态添加
 */
export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/login/index',
            name: 'LoginIndex',
            component: () => import('@/view/login/index.vue'),
            meta: {
                realName: '登录页'
            }
        },
        {
            path: '/404/index',
            name: '404Index',
            component: () => import('@/view/404/index.vue'),
            meta: {
                realName: '404页'
            }
        },
        {
            path: '/about/index',
            name: 'AboutIndex',
            component: () => import('@/view/about/index.vue'),
            meta: {
                realName: '关于我们'
            }
        },

        // {
        //     path: '/home',
        //     redirect: '/home/index', // 如果是 /home 重定向到 /home/index
        //     name: 'Home',
        //     component: main,
        //     children: [
        //         {
        //             path: '/home/index',
        //             name: 'HomeIndex',
        //             component: () => import('@/view/home/index.vue'),
        //             meta: {
        //                 requireAuth: true, // 是否需要权限验证
        //             }
        //         }
        //     ]
        // },

        // {
        //     path: '/entry',
        //     redirect: '/entry/index', // 如果是 /entry 重定向到 /entry/index
        //     name: 'Entry',
        //     component: main,
        //     children: [
        //         {
        //             path: '/entry/index',
        //             name: 'EntryIndex',
        //             component: () => import('@/view/Entry/index.vue'),
        //             meta: {
        //                 requireAuth: true, // 是否需要权限验证
        //             }
        //         }
        //     ]
        // },

        // 没有匹配路由 重定向到404
        // { path: '*', redirect: '/404/index'}
    ]
})