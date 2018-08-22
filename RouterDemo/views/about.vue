<template>
  <div>
    <h1>介绍页</h1>
    <button @click="handleRouter">用户页</button>
    <router-link to="/index">首页</router-link>
  </div>
</template>
<script>
export default {
  methods: {
    handleRouter () {
      this.$router.push('/user/456')
    }
  }
};
</script>
 
<style scoped>
</style>
