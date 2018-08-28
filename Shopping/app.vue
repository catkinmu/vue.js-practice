<template>
    <div>
        <div class="header">
            <router-link 
                to="/list" 
                class="header-title">电商网站</router-link>
            <div class="header-menu">
                <router-link to="/cart" class="header-menu-cart">
                    购物车
                    <span v-if="cartList.length">{{cartList.length}}</span>
                </router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
  // import  Product  from "./components/product.vue";
  components: {},
  computed:{
      cartList(){
          return this.$store.state.cartList;
      }
  },
  methods: {
    handleClick(e) {
      console.log(e);
    }
  }
};
</script>
<style>
#app {
  background: #f1f1ff;
}
</style>
