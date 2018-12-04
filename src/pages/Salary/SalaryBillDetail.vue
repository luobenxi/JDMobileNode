<template>
    <div class="SalaryBill">
        <jd-header title="月工资明细" backUrl="/SalaryApi/SalaryBill"></jd-header>
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
                    <van-col :span="6">应发合计</van-col>
                    <van-col>{{from.ShouldPay}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="6">扣款合计</van-col>
                    <van-col>{{from.DebitSum}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="6">实发合计</van-col>
                    <van-col class="money">{{from.FactPaySum}}</van-col>
                </van-row>
            </van-cell>
            <van-collapse v-model="activeNamesJishi">
                <van-collapse-item title="计时">
                    <van-cell>
                        <van-row gutter="10">
                            <van-col :span="12">计时天数</van-col>
                            <van-col>{{from.WorkDays}}</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="12">计时工资</van-col>
                            <van-col>{{from.BaseSalary}}</van-col>
                        </van-row>
                    </van-cell>
                </van-collapse-item>
            </van-collapse>
            <van-collapse v-model="activeNamesZhongBan">
                <van-collapse-item title="中班">
                    <van-cell>
                        <van-row gutter="10">
                            <van-col :span="6">中班天数</van-col>
                            <van-col>{{from.MiddleAllowanceDays}}</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="6">中班津贴</van-col>
                            <van-col>{{from.MiddleAllowance}}</van-col>
                        </van-row>
                    </van-cell>
                </van-collapse-item>
            </van-collapse>
            <van-collapse v-model="activeNamesWanBan">
                <van-collapse-item title="夜班">
                    <van-cell>
                        <van-row gutter="10">
                            <van-col :span="6">夜班天数</van-col>
                            <van-col>{{from.NightAllowanceDays}}</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="6">夜班津贴</van-col>
                            <van-col>{{from.NightAllowance}}</van-col>
                        </van-row>
                    </van-cell>
                </van-collapse-item>
            </van-collapse>
            <van-collapse v-model="activeNamesJintie">
                <van-collapse-item title="津贴">
                    <van-cell>
                        <van-row gutter="10">
                            <van-col :span="6">保健津贴</van-col>
                            <van-col>{{from.HealthAllowance}}</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="6">岗位津贴</van-col>
                            <van-col>{{from.PostAllowance}}</van-col>
                        </van-row>
                    </van-cell>
                </van-collapse-item>
            </van-collapse>
            <van-collapse v-model="activeNamesButie">
                <van-collapse-item title="补贴">
                    <van-cell>
                        <van-row gutter="10">
                            <van-col :span="6">电话补贴</van-col>
                            <van-col>{{from.PhoneAllowance}}</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="6">长途补贴</van-col>
                            <van-col>{{from.LongAllowance}}</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="6">交通补贴</van-col>
                            <van-col>{{from.TrafficAllowance}}</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="6">餐费补贴</van-col>
                            <van-col>{{from.DelayMealAllowance}}</van-col>
                        </van-row>
                    </van-cell>
                </van-collapse-item>
            </van-collapse>
            <van-collapse v-model="activeNamesJiaBanJiangjin">
                <van-collapse-item title="加班奖金">
                    <van-cell>
                        <van-row gutter="10">
                            <van-col :span="6">加班工资</van-col>
                            <van-col>{{from.AllOverTimeSalary}}</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="6">应发奖金</van-col>
                            <van-col>{{from.Bonus}}</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="6">补发工资</van-col>
                            <van-col>{{from.SupplySalary}}</van-col>
                        </van-row>
                    </van-cell>
                </van-collapse-item>
            </van-collapse>
            <van-collapse v-model="activeNamesJia">
                <van-collapse-item title="事假病假">
                    <van-cell>
                        <van-row gutter="10">
                            <van-col :span="6">病假天数</van-col>
                            <van-col>{{from.SickLeaveDays}}</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="6">病假应扣</van-col>
                            <van-col>{{from.SickLeave}}</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="6">事假小时</van-col>
                            <van-col>{{from.CompassionateLeaveDays}}</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="6">事假应扣</van-col>
                            <van-col>{{from.CompassionateLeave}}</van-col>
                        </van-row>
                    </van-cell>
                </van-collapse-item>
            </van-collapse>
            <van-collapse v-model="activeNamesCut">
                <van-collapse-item title="五险一金扣款明细">
                    <van-cell>
                        <van-row gutter="10">
                            <van-col :span="12">月医疗保险</van-col>
                            <van-col>{{from.MedicalInsurance}}</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="12">月养老保险</van-col>
                            <van-col>{{from.AgedInsurance}}</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="12">月失业保险</van-col>
                            <van-col>{{from.UnemploymentInsurance}}</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="12">月公积金</van-col>
                            <van-col>{{from.HousingFund}}</van-col>
                        </van-row>

                        <van-row gutter="10">
                            <van-col :span="12">补扣医疗保险</van-col>
                            <van-col>{{from.MedicalInsuranceDebit}}</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="12">补扣养老保险</van-col>
                            <van-col>{{from.AgedInsuranceDebit}}</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="12">补扣失业保险</van-col>
                            <van-col>{{from.UnemploymentInsuranceDebit}}</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="12">补扣公积金</van-col>
                            <van-col>{{from.HousingFundDebit}}</van-col>
                        </van-row>
                    </van-cell>
                </van-collapse-item>
            </van-collapse>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="6">备注</van-col>
                    <van-col>{{from.Remark}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="6">计算公式</van-col>
                    <van-col>实发合计=计时工资+津贴+补贴+加班工资+应发奖金+补发工资+病假应扣+事假应扣-扣款合计</van-col>
                </van-row>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import header from '../../components/common/header.vue';
import MUtil from '../../util/mm.js';

const _mm = new MUtil();

export default {
    data () {
        return {
            activeNamesJishi: [],
            activeNamesZhongBan: [],
            activeNamesWanBan: [],
            activeNamesJintie: [],
            activeNamesButie: [],
            activeNamesJiaBanJiangjin: [],
            activeNamesJia: [],
            activeNamesCut: [],
            currentDateStr: '',
            from: {},
        }
    },
    computed: {
        ...mapGetters([
            'SalaryPassValidStatus',
        ]),
    },
    components: {
        [header.name]: header
    },
    methods: {
        ...mapActions([
            'GetUserSalaryMonthBill'
        ]),
        InitSalaryBill() {
            let arr = this.$route.query.currentDate.split('-');
            let data = {
                YYear: arr[0],
                MMonth: arr[1],
            };
            this.GetUserSalaryMonthBill(data).then((res) => {
                this.from = Object.assign({}, res, {
                    SalaryDay: _mm.formatStrDate(res.SalaryDay),
                    TotalSalary: _mm.formatMoney(res.TotalSalary),
                    BaseSalary: _mm.formatMoney(res.BaseSalary),
                    ShouldPay: _mm.formatMoney(res.ShouldPay),
                    DebitSum: _mm.formatMoney(res.DebitSum),
                    FactPaySum: _mm.formatMoney(res.FactPaySum),
                });
            }).catch(err => {
                _mm.errorDialog(err.msg);
            });
        },
    },
    mounted() {
        _mm.checkIsLogin();
        if(!this.SalaryPassValidStatus) {
            // 需要输入工资查询密码，页面跳转
            this.$router.push('/SalaryApi/SalaryPassValid');
        } else {
            this.InitSalaryBill();
        }
    }
}
</script>

<style lang="less" scoped>
    @import "../../style/pages/Salary/SalaryBill";
</style>
