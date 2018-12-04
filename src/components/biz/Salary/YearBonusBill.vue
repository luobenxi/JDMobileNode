<template lang="html">
    <div class="YearBonusBill">
        <van-cell-group>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="10">员工姓名</van-col>
                    <van-col>{{from.FullName}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="10">年终奖周期</van-col>
                    <van-col>{{from.SalaryCycle}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="10">发放时间</van-col>
                    <van-col>{{from.SalaryDay}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="10">年终奖标准</van-col>
                    <van-col>{{from.BonusBase}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="10">年度KPI考核系数</van-col>
                    <van-col>{{from.KPIRatio}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="10">年度出勤系数</van-col>
                    <van-col>{{from.OnWorkRatio}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="10">工龄系数</van-col>
                    <van-col>{{from.WorkAgeRatio}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="10">公司效益系数</van-col>
                    <van-col>{{from.BenefitRatio}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="10">应发合计</van-col>
                    <van-col>{{from.ShouldPay}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="10">代扣税</van-col>
                    <van-col>{{from.Tax}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="10">实发合计</van-col>
                    <van-col class="money">{{from.FactPay}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="10">计算公式</van-col>
                    <van-col>{{from.Remark2}}</van-col>
                </van-row>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: 'JdYearBonusBill',
        props: {
            from: {
                type: Object,
                default: () => {}
            }
        },
        methods: {
        }
    };
</script>

<style lang="less" scroped>
    @import "../../../style/components/biz/Salary/SalaryMonthBill";
</style>
