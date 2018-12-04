<template>
    <div id="jd-list">
        <van-cell-group v-if="itemList && itemList.length">
            <van-cell v-for="item in itemList" :key="item[colNameMap.key]" @click="itemClickHandle(item)" v-if="isLink" is-link>
                <div style="display: flex; justify-content: space-between">
                    <span v-for="colItem in colNameMap.colName">{{item[colItem]}}</span>
                    <span v-if="rightText">{{rightText}}</span>
                </div>
            </van-cell>
            <van-cell v-for="item in itemList" :key="item[colNameMap.key]" @click="itemClickHandle(item)" v-if="!isLink">
                <div style="display: flex; justify-content: space-between">
                    <span v-for="colItem in colNameMap.colName">{{item[colItem]}}</span>
                    <span v-if="rightText">{{rightText}}</span>
                </div>
            </van-cell>
        </van-cell-group>
        <van-pagination
            v-if="isShowPaging && itemList && itemList.length"
            v-model="paging.pageIndex"
            :total-items="originPaging.total"
            :items-per-page="paging.pageSize"
            @change="pageChangeHandle"
        />
    </div>
</template>

<script>
    export default {
        name: 'JdList',
        data () {
            return {
                paging: {
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0
                }
            }
        },
        props: {
            rightText: {
                type: String,
                default: () => ''
            },
            isLink: {
                type: Boolean,
                default: () => true
            },
            colNameMap: {
                type: Object,
                default: () => {},
            },
            itemList: {
                type: Array,
                default: () => []
            },
            isShowPaging: {
                type: Boolean,
                default: () => true
            },
            originPaging: {
                type: Object,
                default: () => {},
            },
        },
        methods: {
            queryHandler() {
                this.paging.pageIndex = 1;
                this.$emit('getData', this.paging);
            },
            itemClickHandle(item) {
                this.$emit('clickCallBack', item);
            },
            pageChangeHandle(val) {
                this.paging.pageIndex = val;
                this.$emit('getData', this.paging);
            }
        },
    }
</script>

<style lang="less" scoped>
    @import "../../style/components/common/list.less";
</style>
