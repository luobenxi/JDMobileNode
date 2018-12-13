<template>
    <div class="jd-back-top" @click="goTop" @scroll="handleScroll" v-if="isShowBtn">顶部</div>
</template>

<script>
    export default {
        name: 'JdBackTop',
        props: {},
        data() {
            return {
                isShowBtn: false
            };
        },
        computed: {},
        methods: {
            // 获取scroll值，解决scrollTop为0问题
            getScroll() {
                return {
                    left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
                    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
                }
            },
            checkIsShowBtn() {
                let scroll = this.getScroll();
                let scrollTop = scroll.top || 0;
                if (scrollTop > 0) {
                    this.isShowBtn = true;
                } else {
                    this.isShowBtn = false;
                }
            },
            goTop() {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            },
            handleScroll() {
                this.checkIsShowBtn();
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll);
        }
    };
</script>

<style lang="less" scoped>
    @import "../../style/components/common/backTop";
</style>
