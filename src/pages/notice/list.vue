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
            }
        },
        computed: {
            ...mapGetters([
                'NoticeListTop10'
            ]),
            itemList() {
                return this.itemListFormat();
            }
        },
        components: {
            [header.name]: header
        },
        methods: {
            ...mapActions([
                'GetNoticeListTop10'
            ]),
            itemListFormat() {
                return this.NoticeListTop10.map((item) => {
                    return Object.assign({}, item, {
                        IsRead: false
                    });
                })
            },
            clickItem(item) {
                this.$router.push(`/notice/detail/${item.ID}`);
            },
        },
        mounted() {
            // this.GetNoticeListTop10();
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
