<template lang="html">
    <div class="SalaryChangeBill">
        <van-cell-group>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="24" class="title">{{from.YYear}}年度工调通知单</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="24">经公司批准，自{{from.ChangeDate}}起您的{{from.YYear}}年度的薪酬调整如下：</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="10">员工姓名</van-col>
                    <van-col>{{from.FullName}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="10">调整时间</van-col>
                    <van-col>{{from.ChangeDate}}</van-col>
                </van-row>
            </van-cell>
            <van-cell v-if="parseFloat(from.BaseSalary)">
                <van-row gutter="10">
                    <van-col :span="10">基本薪酬标准</van-col>
                    <van-col>{{from.BaseSalary}}</van-col>
                </van-row>
            </van-cell>
            <van-cell v-if="parseFloat(from.BenefitSalary)">
                <van-row gutter="10">
                    <van-col :span="10">绩效工资标准</van-col>
                    <van-col>{{from.BenefitSalary}}</van-col>
                </van-row>
            </van-cell>
            <van-cell v-if="parseFloat(from.PostSalary)">
                <van-row gutter="10">
                    <van-col :span="10">岗位工资标准</van-col>
                    <van-col>{{from.PostSalary}}</van-col>
                </van-row>
            </van-cell>
            <van-cell v-if="parseFloat(from.ProjectSalary)">
                <van-row gutter="10">
                    <van-col :span="10">项目工资标准</van-col>
                    <van-col>{{from.ProjectSalary}}</van-col>
                </van-row>
            </van-cell>
            <van-cell v-if="parseFloat(from.Reimbursement)">
                <van-row gutter="10">
                    <van-col :span="10">额定费用标准</van-col>
                    <van-col>{{from.Reimbursement}}</van-col>
                </van-row>
            </van-cell>
            <van-cell v-if="parseFloat(from.PhoneAllowance)">
                <van-row gutter="10">
                    <van-col :span="10">电话补贴</van-col>
                    <van-col>{{from.PhoneAllowance}}</van-col>
                </van-row>
            </van-cell>
            <van-cell v-if="parseFloat(from.ProjectAllowance)">
                <van-row gutter="10">
                    <van-col :span="10">项目负责人项目津贴标准</van-col>
                    <van-col>{{from.ProjectAllowance}}</van-col>
                </van-row>
            </van-cell>
            <van-cell v-if="parseFloat(from.ForeignAllowance)">
                <van-row gutter="10">
                    <van-col :span="10">外籍补助</van-col>
                    <van-col>{{from.ForeignAllowance}}</van-col>
                </van-row>
            </van-cell>
            <van-cell v-if="parseFloat(from.YearBonus)">
                <van-row gutter="10">
                    <van-col :span="10">年终奖标准</van-col>
                    <van-col>{{from.YearBonus}}</van-col>
                </van-row>
            </van-cell>
            <van-cell v-if="parseFloat(from.YearOtherBonus)">
                <van-row gutter="10">
                    <van-col :span="10">年额定奖金标准</van-col>
                    <van-col>{{from.YearOtherBonus}}</van-col>
                </van-row>
            </van-cell>
            <van-cell v-if="parseFloat(from.YearBenefitBonus)">
                <van-row gutter="10">
                    <van-col :span="10">绩效奖标准</van-col>
                    <van-col>{{from.YearBenefitBonus}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="10">备注</van-col>
                    <van-col>
                        <span v-html="from.Remark"></span>
                    </van-col>
                </van-row>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: 'JdSalaryChangeBill',
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
    .title{
        text-align: center;
        font-weight: 600;
    }
</style>
