<template>
    <div>
        <van-list
            :finished="finished"
            @load="onLoad">
            <van-cell
                v-for="item in list"
                :key="item.id"
                :title="item.title"
                class="cell-item"
            />
        </van-list>
        <div class="img-box">
            <img :src="item.imgUrl" :key="item.id" v-for="item in list" width="100%" height="135"/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                finished: false,
                active: 0
            }
        },
        methods: {
            onLoad() {
                this.finished = false;
            },
        },
        mounted() {
            // this.getData();
        }
    }
</script>

<style scoped>
    .cell-item {
        text-align: left;
    }
</style>
