<template>
    <van-popup v-model="pagePopupIsShow" position="bottom" :overlay="true">
        <van-cell class="popup-header-row">
            <van-row type="flex" justify="space-between" class="operationText">
                <van-col>
                    <span @click="cancel">取消</span>
                </van-col>
                <van-col>
                    <span @click="confirm">确认</span>
                </van-col>
            </van-row>
        </van-cell>
        <slot></slot>
        <div class="JdCheckboxDateBox">
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
    </van-popup>
</template>

<script>
    export default {
        // 可以复选的实践性选择器，带弹窗
        name: 'JdCheckboxDatePopup',
        props: {
            popupIsShow: {
                type: Boolean,
                default: () => false
            }
        },
        data() {
            return {
                pagePopupIsShow: false,
                year: this.getDefaultYear(),
                month: this.getDefaultMonth(),
                weekList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                DayOfWeek: 0,
                checkType: 1, // 全选/反选
                tableBodyStr: ``,
                daysCount: 31, // 每个月的天数
            };
        },
        watch: {
            popupIsShow() {
                this.pagePopupIsShow = true;
                this.checkType = 1;
                this.initTableBodyStr(); // 初始化时间选择器，不能在 mounted 的时候初始化，因为页面dom未渲染
            }
        },
        computed: {
            // 年份列表
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
            // 月份列表
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
        methods: {
            // 默认年份
            getDefaultYear() {
                let date = new Date();
                return date.getFullYear();
            },
            // 默认月份
            getDefaultMonth() {
                let date = new Date();
                return date.getMonth() + 1;
            },
            // 取消
            cancel() {
                this.pagePopupIsShow = false;
            },
            // 确认
            confirm() {
                let code_Values = document.getElementsByTagName("input");
                let valArr = [];
                if (code_Values.length) {
                    for (let i = 0; i < code_Values.length; i++) {
                        if (code_Values[i].type === "checkbox") {
                            if (code_Values[i].checked) {
                                let month = parseInt(this.month) < 10 ? `0${this.month}` : `${this.month}`;
                                let day = parseInt(code_Values[i].value) < 10 ? `0${code_Values[i].value}` : `${code_Values[i].value}`;
                                let tempDate = `${this.year}-${month}-${day}`;
                                valArr.push(tempDate);
                            }
                        }
                    }
                }
                this.$emit('onConfirm', valArr);
                this.pagePopupIsShow = false;
            },
            // 时间改变
            DateChange() {
                let d = new Date(this.year, this.month - 1, 1);
                this.DayOfWeek = d.getDay(); //获取当前星期X(0-6,0代表星期天,1=星期一)
                this.initTableBodyStr();
            },
            // 全选/反选
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
            // 初始化时间选择器
            initTableBodyStr() {
                let d = new Date(this.year, this.month - 1, 1); // 从每个月1号算起
                let d2 = new Date(this.year, this.month, 0); // 最后一个参数为0时getDate()可以得到当前月份天数
                this.DayOfWeek = d.getDay(); // 得到每个月的第一天是周几
                this.daysCount = d2.getDate(); // 得到每个月的天数
                // 将 日、一、二、三、四、五、六 => 一、二、三、四、五、六、日
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
                    // 关键算法步骤
                    if (dayCount % 7 === 0 && dayCount !== 0) {
                        BodyStr += `<tr>`;
                    }
                    let checkboxStyle = `margin-top: 3px; width: 16px; height: 16px;`;
                    let cellStyle = `display: flex; align-items: center`;
                    let checkboxStr = `<input type="checkbox" value="${k}" style="${checkboxStyle}">`;
                    BodyStr += `<td style="${tdStyle}"><div style="${cellStyle}">${checkboxStr}<span>${k}</span></<div></td>`;
                    // 关键算法步骤
                    if (dayCount === this.daysCount + i - 1 || dayCount % 7 === 6) {
                        BodyStr += `</tr>`;
                    }
                    dayCount++;
                }
                this.$nextTick(() => {
                    this.$refs.tableBodyId.innerHTML = BodyStr;
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
    .JdCheckboxDateBox {
        .padding(5);
        .year-month-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .fontSize(14);
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
                .marginLeft(10);
            }
            .conform {
                .paddingRight(6);
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
                    .padding2(6, 8);
                    border: 1px solid #DCDFE6;
                    text-align: center;
                }
                td {
                    .padding(8);
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
