<template>
    <div class="Test-box">
        <table>
            <tr>
                <th v-for="item in weekList">{{item}}</th>
            </tr>
            <tr v-for="trItem in trList">
                <td v-for="item in itemList">
                    <input type="checkbox">
                    {{item}}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import MUtil from '../../util/mm';

    const _mm = new MUtil();

    export default {
        name: 'Test',
        data () {
            return {
                weekList: ['日', '一', '二', '三', '四', '五', '六'],
                itemList: [1,2,3,4,5,6,7],
                trList: [1,1,1,1],
            }
        },
        computed: {
            ...mapGetters([
            ]),
        },
        components: {
        },
        methods: {
            ...mapActions([
                'GetTestList'
            ]),
            initData() {
                this.GetTestList().then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                });
            },
            initDayList() {
                let d = new Date(2019, 1, 0);
                //d.getDate()
                let trCount = d.getDate() / 7;
                for (let i = 1; i <= Math.ceil(trCount); i++) {

                }
                for (let j = 1; j <= d.getDate(); j++) {
                    if (j === 7) {
                        this.dayList.push(j);
                    }
                    if (j % 7 === 0) {
                        this.trList.push(j);
                    }
                }
            },
        },
        mounted() {
            // this.initData();
            // this.initDayList();
        }
    }
</script>

<style lang="less" scoped>
    .Test-box {
        padding: 20px 10px;
        table {
            table-layout: fixed;
            width: 100%;
            border-collapse: collapse; // 边框合并
            tr {
                th {
                    padding: 6px 8px;
                    border: 1px solid #EBEEF5;
                    text-align: center;
                }
                td {
                    padding: 8px;
                    border: 1px solid #EBEEF5;
                    text-align: center;
                }
            }
        }
    }
</style>
