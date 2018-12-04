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
                    <van-col :span="24">经公司批准，自{{from.ChangeDate}}起您的{{from.YYear}}年度的薪酬调整如下</van-col>
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
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="10">基本薪酬标准</van-col>
                    <van-col>{{from.BaseSalary}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="10">年终奖标准</van-col>
                    <van-col>{{from.YearBonus}}</van-col>
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
