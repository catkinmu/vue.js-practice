<template>
  <div>
    <h1>首页</h1>
    <p>
      {{count}} <br>
      <button @click="handleIncrement">+1</button>
      <button @click="handleDecrease">-3</button>
    </p>
    <router-link to="/about">介绍页</router-link>
    <router-link to="/user/78797">用户页</router-link>
  </div>
</template>
<script>
export default {
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
  methods:{
    handleIncrement(){
      this.$store.commit('increment')
    },
    handleDecrease(){
      this.$store.commit('decrease',3)
    }
  }
};
</script>
 
<style>
h1 {
  background: aqua;
}
</style>
