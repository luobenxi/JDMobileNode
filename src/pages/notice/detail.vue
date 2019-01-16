<template>
    <div class="notice-box">
        <jd-header title="通知详情"></jd-header>
        <van-cell class="content-box">
            <div class="title">{{model.Title}}</div>
            <div class="notice-content" v-html="model.Content"></div>
            <div>{{model.InsertUserFullName}}</div>
            <div>{{model.InsertTime}}</div>
        </van-cell>
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
                model: {}
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
                'GetArticleByKey'
            ]),
        },
        mounted() {
            let ID = this.$route.params.ID;
            this.GetArticleByKey(ID).then((res) => {
                if (res.success) {
                    this.model = res.data;
                }
            });
        }
    }
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
    .notice-box {
        .content-box {
            color: #606266;
            .title {
                .fontSize(16);
                .marginAuto(5);
                font-weight: bolder;
            }
            .notice-content {
                .paddingTop(8);
                text-indent: 30px;
                .lineHeight(25);
                .fontSize(15);
            }
        }
    }
</style>
