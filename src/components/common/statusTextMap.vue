<template>
    <div>
        <van-tag  v-if="Status === '61'">{{StatusText}}</van-tag>
        <van-tag  v-if="Status === '62'" type="primary">{{StatusText}}</van-tag>
        <van-tag  v-if="Status === '63'" type="success">{{StatusText}}</van-tag>
        <van-tag  v-if="Status === '64'" type="danger">{{StatusText}}</van-tag>
        <van-tag  v-if="Status === '65'" type="danger">{{StatusText}}</van-tag>
        <van-tag  v-if="Status === '66'" type="danger">{{StatusText}}</van-tag>
        <van-tag  v-if="Status === '68'">{{StatusText}}</van-tag>
        <div v-if="Status === null">{{StatusText}}</div>
    </div>
</template>

<script>
    import BizUtil from '../../util/bizUtil';
    const _bizMap = new BizUtil();

    export default {
        name: 'JdStatusTextMap',
        props: {
            Status: {
                type: String,
                default: () => '61'
            },
        },
        data() {
            return {
                StatusText: _bizMap.JDApproveStatusMap(this.Status),
            };
        },
        watch: {
            Status(val) {
                this.StatusText =  _bizMap.JDApproveStatusMap(val);
            }
        },
        methods: {
        },
    };
</script>

<style lang="less" scoped>
</style>
