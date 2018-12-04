<template>
    <div class="swipe">
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="item in swipeList" :key="item.id">
                <img :src="item.src" width="100%" @click="imgOnclick(item)"/>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
    export default {
        name: 'JdSwipe',
        props: {
            swipeList: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            imgOnclick(item) {
                console.log(item);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../style/components/biz/home/swipe.less";
</style>
