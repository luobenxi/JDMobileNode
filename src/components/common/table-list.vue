<template>
    <div id="jd-table-list">
        <van-cell>
            <van-row v-if="title">
                <van-col :span="24" class="title">{{title}}</van-col>
            </van-row>
            <van-row class="row">
                <van-col span="24">
                    <table>
                        <tr v-if="colNameMap.length">
                            <th v-for="column in colNameMap" :width="column.width">{{column.displayName}}</th>
                        </tr>
                        <tr v-if="itemList.length" v-for="(item, index) in itemList" :key="index">
                            <td v-for="column in colNameMap" :width="column.width">{{item[column.key]}}</td>
                        </tr>
                    </table>
                </van-col>
            </van-row>
        </van-cell>
        <div></div>
    </div>
</template>

<script>
    export default {
        name: 'JdTableList',
        data () {
            return {
            }
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
        methods: {
        },
    }
</script>

<style lang="less" scoped>
    #jd-table-list {
        .title {
            margin: -3px auto 2px auto;
        }
        table {
            width: 100%;
            border-collapse: collapse; // 边框合并
            tr {
                th, td {
                    border: 1px solid #EBEEF5;
                    text-align: center;
                }
            }
        }
    }
</style>
