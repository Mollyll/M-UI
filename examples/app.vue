<template>
    <div>
        <h1>welcome to Vue!</h1>
        <div class="container-left">
            <m-button @click="toButton">按钮</m-button>
        </div>
        <div class="container-right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "app",
        methods: {
            toButton () {
                this.$router.push('/button')
            }
        }
    }
</script>
<style lang="less">
    .container-left {
        float: left;
        width: 20%;
    }
    .container-right {
        float: left;
        width: 80%;
        border-left: 1px solid gray;
    }
</style>