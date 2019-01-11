<template>
    <div class="Test-box">
        <div class="year-month-box">
            <div class="left-box">
                <select v-model="year" class="select-css year" @change="DateChange">
                    <option v-for="(item, index) in yearOption" :key="index" :value="item.key">{{item.text}}</option>
                </select>
                <select v-model="month" class="select-css month" @change="DateChange">
                    <option v-for="(item, index) in monthOption" :key="index" :value="item.key">{{item.text}}</option>
                </select>
                <div class="operationText month" v-if="checkType === 1" @click="CheckAll(1)">全选</div>
                <div class="operationText month" v-if="checkType === 0" @click="CheckAll(0)">取消</div>
            </div>
            <div class="operationText conform" @click="sub">确认</div>
        </div>
        <div class="week-box">
            <table>
                <tr>
                    <th v-for="item in weekList">{{item}}</th>
                </tr>
                <tbody ref="tableBodyId"></tbody>
            </table>
        </div>
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
                year: 2019,
                month: 1,
                weekList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                DayOfWeek: 0,
                checkType: 1,
                tableBodyStr: ``,
                daysCount: 31, // 每个月的天数
            }
        },
        computed: {
            ...mapGetters([
            ]),
            yearOption() {
                let arr = [];
                let date = new Date();
                let year = date.getFullYear();
                for (let i = year; i <= year + 1; i++) {
                    arr.push({
                        key: i,
                        text: `${i}年`
                    });
                }
                return arr;
            },
            monthOption() {
                let arr = [];
                let date = new Date();
                let month = date.getMonth() + 1;
                for (let i = month; i <= 12; i++) {
                    arr.push({
                        key: i,
                        text: `${i}月`
                    });
                }
                return arr;
            }
        },
        components: {
        },
        methods: {
            ...mapActions([
                'GetTestList',
            ]),
            DateChange() {
                let d = new Date(this.year, this.month - 1, 1);
                this.DayOfWeek = d.getDay(); //获取当前星期X(0-6,0代表星期天,1=星期一)
                this.initTableBodyStr();
            },
            CheckAll(type) {
                if (type === 1) {
                    this.checkType = 0;
                } else {
                    this.checkType = 1;
                }
                let code_Values = document.getElementsByTagName("input");
                if (code_Values.length) {
                    for (let i = 0; i < code_Values.length; i++) {
                        if (code_Values[i].type === "checkbox") {
                            if (type === 1) {
                                if (!code_Values[i].checked) {
                                    code_Values[i].checked = true;
                                }
                            } else {
                                if (code_Values[i].checked) {
                                    code_Values[i].checked = false;
                                }
                            }
                        }
                    }
                }
            },
            initTableBodyStr() {
                let d = new Date(this.year, this.month - 1, 1); // 从每个月1号算起
                let d2 = new Date(this.year, this.month, 0); // 最后一个参数为0时月份天数
                this.DayOfWeek = d.getDay(); // 得到每个月的第一天是周几
                this.daysCount = d2.getDate(); // 得到每个月的天数
                let i = 0;
                if (this.DayOfWeek === 1) {
                    i = 0;
                }
                if (this.DayOfWeek === 2) {
                    i = 1;
                }
                if (this.DayOfWeek === 3) {
                    i = 2;
                }
                if (this.DayOfWeek === 4) {
                    i = 3;
                }
                if (this.DayOfWeek === 5) {
                    i = 4;
                }
                if (this.DayOfWeek === 6) {
                    i = 5;
                }
                if (this.DayOfWeek === 7) {
                    i = 6;
                }
                let dayCount = i;
                let BodyStr = ``;
                let tdStyle = `padding: 6px;border: 1px solid #DCDFE6;text-align: center;`;
                if (dayCount > 0) {
                    BodyStr += `<tr>`;
                    for (let j = 0; j < dayCount; j++) {
                        BodyStr += `<td style="${tdStyle}"></td>`; // 前几格为空
                    }
                }
                for (let k = 1; k <= this.daysCount; k++) {
                    if (dayCount % 7 === 0 && dayCount !== 0) {
                        BodyStr += `<tr>`;
                    }
                    let checkboxStyle = `margin-top: 3px; width: 16px; height: 16px;`;
                    let cellStyle = `display: flex; align-items: center`;
                    let checkboxStr = `<input type="checkbox" value="${k}" style="${checkboxStyle}">`;
                    BodyStr += `<td style="${tdStyle}"><div style="${cellStyle}">${checkboxStr}<span>${k}</span></<div></td>`;
                    if (dayCount === this.daysCount + i - 1 || dayCount % 7 === 6) {
                        BodyStr += `</tr>`;
                    }
                    dayCount++;
                }
                this.$refs.tableBodyId.innerHTML = BodyStr;
            },
            sub() {
                let code_Values = document.getElementsByTagName("input");
                let valArr = [];
                if (code_Values.length) {
                    for (let i = 0; i < code_Values.length; i++) {
                        if (code_Values[i].type === "checkbox") {
                            if (code_Values[i].checked) {
                                let tempDate = `${this.year}-${this.month}-${code_Values[i].value}`;
                                valArr.push(tempDate);
                            }
                        }
                    }
                }
                console.log(valArr);
            }
        },
        mounted() {
            this.initTableBodyStr();
        }
    }
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
    .Test-box {
        padding: 10px;
        .year-month-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left-box {
                width: 90%;
                display: flex;
                align-items: center;
            }
            .year {
                width: 25%
            }
            .month {
                width: 20%;
                margin-left: 8px;
            }
            .conform {
                padding-right: 6px;
            }
        }
        .week-box {
            margin: 6px auto;
        }
        table {
            table-layout: fixed;
            width: 100%;
            border-collapse: collapse; // 边框合并
            tr {
                th {
                    padding: 6px 8px;
                    border: 1px solid #DCDFE6;
                    text-align: center;
                }
                td {
                    padding: 8px;
                    border: 1px solid #DCDFE6;
                    text-align: center;
                }
            }
        }
        .select-css {
            width: 100%;
            border: solid 1px #c9c9c9;
            .heightSingle(26);
            .padding(1);
            .borderRadius(3);
            .fontSize(12);
        }
    }
</style>
