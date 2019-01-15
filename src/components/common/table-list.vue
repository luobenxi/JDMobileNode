<template>
    <div id="jd-table-list">
        <van-cell v-if="colNameMap.length && itemList.length">
            <van-row v-if="title">
                <van-col :span="24" class="table-title">{{title}}</van-col>
            </van-row>
            <van-row class="row">
                <van-col span="24">
                    <div class="maxHeight300">
                        <table>
                            <thead>
                                <tr v-if="itemList.length">
                                    <th v-for="column in colNameMap" :width="column.width">{{column.displayName}}</th>
                                    <!-- 插入自定义列的Header -->
                                    <slot name="columnHeaderSlot"></slot>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="colNameMap.length" v-for="(item, index) in itemList" :key="index">
                                    <td :class="column.ellipsis ? 'ellipsis' : ''" :align="!column.align ? 'center' : column.align"
                                        v-if="colNameMap.length" v-for="column in colNameMap" :width="column.width">
                                        {{item[column.key]}}
                                    </td>
                                    <!-- 插入自定义列的Body -->
                                    <slot name="columnBodySlot" :item="item"></slot>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </van-col>
            </van-row>
        </van-cell>
        <div></div>
    </div>
</template>

<script>
    export default {
        name: 'JdTableList',
        data() {
            return {}
        },
        props: {
            title: {
                type: String,
                default: () => ''
            },
            itemList: {
                type: Array,
                default: () => []
            },
            colNameMap: {
                type: Array,
                default: () => []
            }
        },
    }
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
</style>
