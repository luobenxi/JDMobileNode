<template lang="html">
    <div id="error_wrapper">
        <div class="content">
            {{errMsg}}
        </div>
        <div class="back">点击返回 <span @click="goHome">首页</span></div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                errMsg: '你没有操作权限',
            };
        },
        methods: {
            goHome() {
                this.$router.push('/home');
            }
        },
    };
</script>

<style lang="less" scoped>
    @import "../style/pages/error.less";
</style>
