const Routers = [
  {
      path: '/list',
      meta: {
          title: '商品列表'
      },
      component: (resolve) => require(['./views/list.vue'], resolve)
  },
  {
      path: '*',
      redirect: '/list'
  }
]
export default Routers