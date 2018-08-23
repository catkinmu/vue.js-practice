<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>


export default {
    components: {

    },
    methods: {
        handleClick (e) {
            console.log(e);
        }
    }
}
</script>
<style>
#app{
    background: #f1f1ff
}
</style>
