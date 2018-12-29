<template>
    <div id="jd-list">
        <van-cell-group v-if="itemList && itemList.length">
            <!--常用-->
            <van-cell v-for="(item, index) in itemList" :key="item[colNameMap.key] + index" @click="itemClickHandle(item)" :is-link="isLink">
                <div class="row-item">
                    <span v-for="colItem in colNameMap.colName">{{item[colItem]}}</span>
                    <!-- 插入自定义列，name为插槽名称，item为与父组件传值的key -->
                    <slot name="handlerColumn" :item="item"></slot>
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
        ></van-pagination>
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
                default: () => true, // 默认显示箭头
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
    @import "../../style/components/common/list";
</style>
