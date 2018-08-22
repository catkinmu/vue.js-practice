import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './app.vue';

Vue.use(VueRouter)

const Routers = [
    {
        path: '/index',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/about',
        meta: {
            title: '关于'
        },
        component: (resolve) => require(['./views/about.vue'], resolve)
    },
    {
        path: '/user/:id',
        meta: {
            title: '个人主页'
        },
        component: (resolve) => require(['./views/user.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/index'
    }
]

const RouterConfig = {
    //使用 HTML5 的 History 路由模式
    mode: 'history',
    routes: Routers
}

const router = new VueRouter(RouterConfig)

router.beforeEach((to, form, next) => {
    window.document.title = to.meta.title
    next()
})

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0)
})
new Vue({
    el: '#app',
    router,
    render: h => {
        return h(App)
    }
});