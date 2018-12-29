<template>
    <div class="SalaryBill">
        <jd-header title="工资查询" :backUrl="backUrl"></jd-header>
        <van-tabs v-model="active" @click="tabClick">
            <van-tab title="月工资"></van-tab>
            <van-tab title="年终奖"></van-tab>
            <van-tab title="年度调薪"></van-tab>
        </van-tabs>
        <JdDatetimePickerSwitch :showDate="currentDateStr" @changeDate="changeDateHandle"></JdDatetimePickerSwitch>
        <JdSalaryMonthBill :from="from" v-if="active === 0 && isShow" @SalaryDetailEmit="SalaryDetail"></JdSalaryMonthBill>
        <JdYearBonusBill :from="from" v-if="active === 1 && isShow"></JdYearBonusBill>
        <JdSalaryChangeBill :from="from" v-if="active === 2 && isShow"></JdSalaryChangeBill>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import header from '../../components/common/header.vue';
import JdDatetimePickerSwitch from '../../components/common/datetimePickerSwitch';
import SalaryMonthBill from '../../components/biz/Salary/SalaryMonthBill';
import YearBonusBill from '../../components/biz/Salary/YearBonusBill';
import SalaryChangeBill from '../../components/biz/Salary/SalaryChangeBill';
import MUtil from '../../util/mm';

const _mm = new MUtil();

export default {
    data () {
        return {
            backUrl: _mm.GetEmployeeSelfHelpUrl(),
            currentDate: new Date(),
            currentDateStr: _mm.formatMonth(this.GetOneMonthBeforeDate()),
            active: 0,
            from: {},
            isShow: 0,
        }
    },
    computed: {
        ...mapGetters([
            'SalaryPassValidStatus',
        ]),
    },
    components: {
        [header.name]: header,
        [JdDatetimePickerSwitch.name]: JdDatetimePickerSwitch,
        [SalaryMonthBill.name]: SalaryMonthBill,
        [YearBonusBill.name]: YearBonusBill,
        [SalaryChangeBill.name]: SalaryChangeBill,
    },
    methods: {
        ...mapActions([
            'GetUserSalaryMonthBill',
            'GetUserYearBonusBill',
            'GetUserSalaryChangeBill',
        ]),
        // 获取默认日期，如果当天小于15号则返回前一个月，否则返回当月
        GetOneMonthBeforeDate() {
            let sendSalaryDate = 15; // 发工资的日期
            let date = new Date();
            let day = date.getDate();
            if (day > sendSalaryDate) {
                return date;
            }
            date.setMonth(date.getMonth() - 1);
            let month = date.getMonth();
            month = ((month === 0) ? (12) : (month));
            let befStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +date.getDate();
            let befDate = new Date(befStr);
            return befDate;
        },
        GetFullYear() {
            let date = new Date();
            return date.getFullYear();
        },
        tabClick(val) {
            if (val === 0) {
                // 月工资
                this.currentDateStr = _mm.formatMonth(this.GetOneMonthBeforeDate()); // 获取默认日期
                this.InitSalaryBill();
            } else if (val === 1) {
                // 年终奖
                this.currentDateStr = _mm.formatMonth(new Date(`${this.GetFullYear()}-01`)); // 默认选中日期：当前年-01月，如：2018-01
                this.InitYearBonusBill();
            } else {
                // 调薪
                this.currentDateStr = this.GetCurrentDateArr().YYear; // 只显示年
                this.InitSalaryChangeBill();
            }
        },
        changeDateHandle(val) {
            this.currentDateStr = _mm.formatMonth(val);
            if (this.active === 0) {
                // 月工资
                this.InitSalaryBill();
            } else if (this.active === 1) {
                // 年终奖
                this.InitYearBonusBill();
            } else {
                // 调薪
                this.currentDateStr = this.GetCurrentDateArr().YYear; // 只显示年
                this.InitSalaryChangeBill();
            }
        },
        InitSalaryBill() {
            let data = this.GetCurrentDateArr();
            this.GetUserSalaryMonthBill(data).then((res) => {
                this.from = Object.assign({}, res, {
                    SalaryDay: _mm.formatStrDate(res.SalaryDay),
                    TotalSalary: _mm.formatMoney(res.TotalSalary),
                    BaseSalary: _mm.formatMoney(res.BaseSalary),
                    ShouldPay: _mm.formatMoney(res.ShouldPay),
                    DebitSum: _mm.formatMoney(res.DebitSum),
                    FactPaySum: _mm.formatMoney(res.FactPaySum),
                });
                this.isShow = 1;
            }).catch(err => {
                this.isShow = 0;
                _mm.errorDialog(err.msg);
            });
        },
        InitYearBonusBill() {
            let data = this.GetCurrentDateArr();
            this.GetUserYearBonusBill(data).then((res) => {
                this.from = Object.assign({}, res, {
                    SalaryDay: _mm.formatStrDate(res.SalaryDay),
                    BonusBase: _mm.formatMoney(res.BonusBase),
                    ShouldPay: _mm.formatMoney(res.ShouldPay),
                    Tax: _mm.formatMoney(res.Tax),
                    FactPay: _mm.formatMoney(res.FactPay),
                });
                this.isShow = 1;
            }).catch(err => {
                this.isShow = 0;
                _mm.errorDialog(err.msg);
            });
        },
        InitSalaryChangeBill() {
            let data = this.GetCurrentDateArr();
            this.GetUserSalaryChangeBill(data).then((res) => {
                this.from = Object.assign({}, res, {
                    ChangeDate: _mm.formatStrDate(res.ChangeDate),
                    BaseSalary: _mm.formatMoney(res.BaseSalary),
                    YearBonus: _mm.formatMoney(res.YearBonus),
                });
                this.isShow = 1;
            }).catch(err => {
                this.isShow = 0;
                _mm.errorDialog(err.msg);
            });
        },
        GetCurrentDateArr() {
            let arr = this.currentDateStr.split('-');
            let data = {
                YYear: arr[0],
                MMonth: arr[1],
            };
            return data;
        },
        SalaryDetail() {
            let params = {
                path: '/SalaryApi/SalaryBillDetail',
                query:{
                    currentDate: this.currentDateStr
                }
            };
            this.$router.push(params);
        }
    },
    mounted() {
        _mm.checkIsLogin();
        if(!this.SalaryPassValidStatus) {
            // 需要输入工资查询密码，跳转到密码验证页面
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
