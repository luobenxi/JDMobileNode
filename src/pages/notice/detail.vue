<template>
    <div class="notice-box">
        <jd-header title="通知详情"></jd-header>
        <van-cell class="content-box">
            <div class="title">{{model.Title}}</div>
            <div class="notice-content" v-html="model.Content"></div>
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
                model: {
                    ID: 1,
                    Title: '哈登57+9卡佩拉伤停康利14+7火箭大胜灰熊',
                    Content: `直播吧1月15日讯 火箭今日背靠背迎战同区对手灰熊，上一场对阵魔术的比赛中，卡佩拉右手拇指受伤被告知需缺席4-6周，缺兵少将的火箭只能派上老迈的内内首发出战。上半场的火箭除了哈登以外所有的球员进攻端表现都很一般，替补阵容半场仅得5分，但火箭这边哈登状态实在火热，他首节7投5中砍下15分帮助火箭一直咬住比分，次节火箭抓住灰熊进攻不利稳步反扑，其中哈登这一节加强火力单节轰下21分，半场36分的爆炸性表演也帮助火箭以54-48反超灰熊结束上半场。下半场灰熊改变策略全场领防甚至包夹哈登，这也让其他球员有了发挥的机会，火箭其他球员各种三分很快便将优势拉大至两位数，末节哈登替补登场后连砍8分将优势扩大至20分以上奠定胜局。最终，火箭112-94大胜灰熊拿下比赛。
                    <img src="https://tu.qiumibao.com/uploads/day_190115/201901150406015283.jpg" width="100%" />
                    <br />
                    <br />
                    <br />
                    信息部
                    <br />
                    2019-1-15`
                }
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
        },
        mounted() {
            let ID = this.$route.params.ID;
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
