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
// 数组排重
function getFilterArray(array) {
    const res = []
    const json = {}
    for (let i = 0; i < array.length; i++) {
        const _self = array[i];
        if (!json[_self]) {
            res.push(_self);
            json[_self] = 1
        }
    }
    return res
}

const store = new Vuex.Store({
    state: {
        //商品列表数据
        productList: [],
        //购物车数据
        cartList: []
    },
    getters: {
        brands: state => {
            const brands = state.productList.map(item => item.brand);
            return getFilterArray(brands)
        },
        colors: state => {
            const colors = state.productList.map(item => item.color);
            return getFilterArray(colors)
        }
    },
    mutations: {
        setProductList(state, data) {
            state.productList = data
        },
        addCart(state, id) {
            const isAdded = state.cartList.find(item => item.id === id);
            if (isAdded) {
                isAdded.count++
            } else {
                state.cartList.push({
                    id: id,
                    count: 1
                })
            }
        },
        //修改商品数量
        editCartCount(state, payload) {
            const product = state.cartList.find(item => item.id === payload.id);
            product.count += payload.count
        },
        //删除商品
        deleteCart(state, id) {
            const index = state.cartList.findIndex(item => item.id === id);
            state.cartList.splice(index, 1)
        },
        //清空购物车
        emptyCart(state) {
            state.cartList = []
        }
    },
    actions: {
        getProductList(context) {
            setTimeout(() => {
                context.commit('setProductList', product_data)
            }, 500)
        },
        buy(context) {
            // 真实环境应通过 ajax 提交购买请求后再清空购物列表
            return new Promise(resolve=> {
                setTimeout(() => {
                    context.commit('emptyCart');
                    resolve();
                }, 500)
            });
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