<template>
  <div>
    {{$route.params.id}}
    <p></p>
    <router-link to="/index">首页</router-link>
    <router-link to="/about">介绍页</router-link>
  </div>
</template>
<script>
export default {
  mounted () {
    console.log(this.$route);

  }
};
</script>
 
<style scoped>
</style>
