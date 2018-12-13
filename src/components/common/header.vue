<template>
    <div id="jd-header">
        <van-nav-bar
            v-if="leftArrow"
            :title="title"
            :left-text="leftText"
            left-arrow
            @click-left="onClickLeft"
        />
        <van-nav-bar
            v-if="!leftArrow"
            :title="title"
            :left-text="leftText"
            @click-left="onClickLeft"
        />
        <JdBackTop></JdBackTop>
    </div>
</template>

<script>
    import backTop from '../../components/common/backTop';

    export default {
        name: 'JdHeader',
        props: {
            leftArrow: {
                type: Boolean,
                default: () => true
            },
            title: {
                type: String,
                default: () => '默认标题'
            },
            leftText: {
                type: String,
                default: () => ''
            },
            backUrl: {
                type: String,
                default: () => ''
            }
        },
        data() {
            return {};
        },
        methods: {
            onClickLeft() {
                if (this.backUrl) {
                    this.$router.push(this.backUrl);
                } else {
                    this.$router.history.go(-1);
                }
            }
        },
        components: {
            [backTop.name]: backTop,
        },
    };
</script>

<style lang="less" scoped>
    @import "../../style/components/common/header.less";
</style>
