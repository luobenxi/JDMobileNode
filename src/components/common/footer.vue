<template>
    <div id="jd-footer">
        <van-tabbar v-model="active" class="footer-menu-box">
            <van-tabbar-item icon="home" to="/home">首页</van-tabbar-item>
            <van-tabbar-item icon="records" to="/todoCategory" v-if="todoCount > 0" :info="todoCount">待办</van-tabbar-item>
            <van-tabbar-item icon="records" to="/todoCategory" v-else>待办</van-tabbar-item>
            <van-tabbar-item icon="chat" to="/contacts">通讯录</van-tabbar-item>
            <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
        </van-tabbar>
        <JdBackTop></JdBackTop>
    </div>
</template>

<script>
    import backTop from '../../components/common/backTop';

    export default {
        name: 'JdFooter',
        props: {
            todoCount: {
                type: Number,
                default: () => 0
            }
        },
        data() {
            return {
                active: 0
            }
        },
        components: {
            [backTop.name]: backTop,
        },
        computed: {},
        methods: {
            pathMap(path) {
                let active = 0;
                if (path === '/home') {
                    active = 0;
                } else if (path === '/todoCategory') {
                    active = 1;
                } else if (path === '/contacts') {
                    active = 2;
                } else if (path === '/my') {
                    active = 3;
                }
                return active;
            },
            getActive() {
                let path = this.$router.history.current.path;
                return this.pathMap(path);
            }
        },
        mounted() {
            this.active = this.getActive();
        }
    };
</script>

<style lang="less" scroped>
    @import "../../style/components/common/footer.less";
</style>
