<template>
    <div class="approve-finish-box">{{showText}}</div>
</template>

<script>
    export default {
        name: 'JdApproveFinishSeal',
        props: {
            showText: {
                type: String,
                default: () => '已通过审批'
            },
        },
        data() {
            return {
            };
        },
        computed: {
        },
        methods: {
        },
    };
</script>

<style lang="less" scoped>
    @import "../../style/config";
    .approve-finish-box {
        width: 50%;
        text-align: center;
        position: fixed;
        .heightSingle(50);
        .lineHeight(50);
        .top(100);
        .right(10);
        z-index: 999;
        transform: rotate(24deg); // 旋转
        .fontSize(30);
        color: red;
        border: solid 2px red;
    }
</style>
