<template>
    <div class="notice-box">
        <jd-header title="系统通知"></jd-header>
        <van-cell v-for="item in itemList" :key="item.ID" @click="clickItem(item)" is-link>
            <van-row gutter="5" class="row-item">
                <van-col :span="1">
                    <div class="hot" v-if="!item.IsRead"></div>
                    <div class="read" v-else></div>
                </van-col>
                <van-col :span="23">{{item.Title}}</van-col>
            </van-row>
        </van-cell>
        <van-cell></van-cell>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import header from '../../components/common/header';
    import MUtil from '../../util/mm';

    const _mm = new MUtil();

    export default {
        data () {
            return {
                itemList: [
                    {
                        ID: 1,
                        Title: '哈登57+9 卡佩拉伤停 康利14+7 火箭大胜灰熊',
                        IsRead: false
                    },
                    {
                        ID: 2,
                        Title: '拉塞尔34+7塔图姆34分 送绿军3连败篮网送绿',
                        IsRead: true
                    },
                    {
                        ID: 3,
                        Title: '韧带受损 卡佩拉因右拇指受伤将休战4-6周',
                        IsRead: true
                    }
                ]
            }
        },
        computed: {
            ...mapGetters([
            ]),
        },
        components: {
            [header.name]: header
        },
        methods: {
            ...mapActions([
            ]),
            clickItem(item) {
                this.$router.push(`/notice/detail/${item.ID}`);
            },
        },
        mounted() {
        }
    }
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
    .notice-box {
        .row-item {
            display: flex;
            align-items: center;
            .hot {
                .widthSingle(5);
                .heightSingle(5);
                border-radius: 50%;
                background-color: #F56C6C;
            }
            .read {
                .widthSingle(5);
                .heightSingle(5);
                border-radius: 50%;
                background-color: #C0C4CC;
            }
        }
    }
</style>
