<template>
    <div class="news">
        <van-cell class="news-title" :title="title"></van-cell>
        <van-cell-group v-for="item in newsList" :key="item.id">
            <van-cell :title="item.title" class="news-item" @click="newsClickHandle(item)" is-link></van-cell>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: 'JdNews',
        props: {
            title: {
                type: String,
                default: () => '积大百科'
            },
            newsList: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            newsClickHandle(item) {
                console.log(item);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../style/components/biz/home/news.less";
</style>
