<template>
    <div id="jd-header">
        <van-nav-bar
            :title="title"
            :left-text="leftText"
            :left-arrow="leftArrow"
            @click-left="onClickLeft"
        >
            <van-icon v-if="rightSearchArrow" @click="searchIconClick" name="search" slot="right"/>
        </van-nav-bar>
        <JdBackTop></JdBackTop>
    </div>
</template>

<script>
    import backTop from '../../components/common/backTop';

    export default {
        name: 'JdHeader',
        props: {
            title: {
                type: String,
                default: () => '默认标题'
            },
            leftArrow: {
                type: Boolean,
                default: () => true
            },
            leftText: {
                type: String,
                default: () => ''
            },
            rightSearchArrow: {
                type: Boolean,
                default: () => false
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
            },
            searchIconClick() {
                this.$emit('searchIconClickHandle');
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
