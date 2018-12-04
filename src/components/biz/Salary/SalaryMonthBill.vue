<template lang="html">
    <div class="JdSalaryMonthBill">
        <van-cell-group>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="6">员工姓名</van-col>
                    <van-col>{{from.FullName}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="6">计薪周期</van-col>
                    <van-col>{{from.SalaryCycle}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="6">发放时间</van-col>
                    <van-col>{{from.SalaryDay}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="6">标准薪酬</van-col>
                    <van-col>{{from.TotalSalary}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="6">计时天数</van-col>
                    <van-col>{{from.WorkDays}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="6">计时工资</van-col>
                    <van-col>{{from.BaseSalary}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="6">应发合计</van-col>
                    <van-col>{{from.ShouldPay}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="6">扣款合计</van-col>
                    <van-col class="cutMoneyBox">
                        <span>{{from.DebitSum}}</span>
                        <span class="detail" @click="SalaryDetail">查看明细</span>
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="6">实发合计</van-col>
                    <van-col class="money">{{from.FactPaySum}}</van-col>
                </van-row>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: 'JdSalaryMonthBill',
        props: {
            from: {
                type: Object,
                default: () => {}
            }
        },
        methods: {
            SalaryDetail() {
                this.$emit('SalaryDetailEmit');
            }
        }
    };
</script>

<style lang="less" scroped>
    @import "../../../style/components/biz/Salary/SalaryMonthBill";
</style>
