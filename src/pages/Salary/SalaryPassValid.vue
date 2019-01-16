<template>
    <div class="content-box">
        <jd-header title="工资查询密码验证" :backUrl="backUrl"></jd-header>
        <div class="input-box">
            <van-cell-group>
                <van-field v-model="from.SalaryPass" :icon="SalaryPassIcon" @click-icon="SalaryPassIconClick" :type="SalaryPassType" placeholder="请输入工资查询密码" />
            </van-cell-group>
        </div>
        <div class="sub-btn">
            <van-button type="primary" block @click="submitHandle">查 询</van-button>
        </div>
        <div class="edit-pwd-box" @click="editPwd">修改工资查询密码</div>
    </div>
</template>

<script>
    import {
        mapActions, mapGetters
    } from 'vuex';
    import header from '../../components/common/header';
    import MUtil from '../../util/mm';

    const _mm = new MUtil();

    export default {
        data () {
            return {
                backUrl: _mm.GetEmployeeSelfHelpUrl(),
                SalaryPassIsSee: false,
                from: {
                    SalaryPass: '',
                }
            }
        },
        computed: {
            ...mapGetters([
                'SalaryPassValidStatus',
            ]),
            SalaryPassIcon() {
                return this.SalaryPassIsSee ? 'password-view' : 'password-not-view';
            },
            SalaryPassType() {
                return this.SalaryPassIsSee ? 'text' : 'password';
            },
        },
        components: {
            [header.name]: header
        },
        methods: {
            ...mapActions([
                'salaryPassCheck',
            ]),
            editPwd() {
                this.$router.push('/change-salary-pwd');
            },
            SalaryPassIconClick() {
                this.SalaryPassIsSee = !this.SalaryPassIsSee;
            },
            submitHandle() {
                if (this.from.SalaryPass === '') {
                    _mm.errorDialog('请输入工资查询密码');
                    return false;
                }
                this.salaryPassCheck(this.from).then(() => {
                    this.$router.push('/SalaryApi/SalaryBill');
                }).catch(err => {
                    if (err.code === 30002) {
                        // code=30002表示查询密码为空，需要设置查询密码
                        _mm.confirmDialog(err.msg, () => {
                            this.$router.push('/reset-salary-pwd');
                        });
                        return;
                    }
                    _mm.errorDialog(err.msg || '操作错误');
                });
            }
        },
        mounted() {
            _mm.checkIsLogin();
            if(this.SalaryPassValidStatus) {
                // 已经输入了正确的工资查询密码
                this.$router.push('/SalaryApi/SalaryBill');
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
    @import "../../style/pages/Salary/SalaryPassValid";
</style>
