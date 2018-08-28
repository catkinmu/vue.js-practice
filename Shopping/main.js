import Vue from 'vue';
import VueRouter from 'vue-router';
import Routers from './router.js';
import Vuex from 'vuex'
import App from './app.vue';
import './style.css'
import product_data from "./json/product.js";
Vue.use(VueRouter)
Vue.use(Vuex)

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

const store = new Vuex.Store({
    state: {
        //商品列表数据
        productList: [],
        //购物车数据
        cartList: []
    },
    getters: {

    },
    mutations: {
        setProductList(state,data){
            state.productList = data
        }
    },
    actions: {
        getProductList(context){
            setTimeout(()=>{
                context.commit('setProductList',product_data)
            },500)
        }
    }

})

new Vue({
    el: '#app',
    router,
    store,
    render: h => {
        return h(App)
    }
});