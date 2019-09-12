<template>
    <div class="change-pwd-box">
        <jd-header title="重置工资查询密码"></jd-header>
        <div class="input-box">
            <van-cell-group>
                <van-field v-model="from.password_new" :icon="passwordIconNew" @click-icon="passwordIconClickNew" :type="passwordTypeNew" placeholder="请输入新密码" />
                <van-field v-model="from.password_new2" :icon="passwordIconNew2" @click-icon="passwordIconClickNew2" :type="passwordTypeNew2" placeholder="请输入确认密码" />
            </van-cell-group>
        </div>
        <div class="btn-box">
            <van-button type="primary" block @click="changeHandle">提交保存</van-button>
        </div>
    </div>
</template>

<script>
import {
    mapActions
} from 'vuex';
import header from '../../components/common/header';
import MUtil from '../../util/mm';

const _mm = new MUtil();

export default {
    name: 'JdResetSalaryPwd',
    data () {
        return {
            passwordIsSeeNew: false,
            passwordIsSeeNew2: false,
            from: {
                password_new: '',
                password_new2: '',
            }
        }
    },
    computed: {
        passwordIconNew() {
            return this.passwordIsSeeNew ? 'password-view' : 'password-not-view';
        },
        passwordIconNew2() {
            return this.passwordIsSeeNew2 ? 'password-view' : 'password-not-view';
        },
        passwordTypeNew() {
            return this.passwordIsSeeNew ? 'text' : 'password';
        },
        passwordTypeNew2() {
            return this.passwordIsSeeNew2 ? 'text' : 'password';
        }
    },
    components: {
        [header.name]: header
    },
    methods: {
        ...mapActions([
            'ResetUserSalaryPwd',
        ]),
        passwordIconClickOld() {
            this.passwordIsSeeOld = !this.passwordIsSeeOld;
        },
        passwordIconClickNew() {
            this.passwordIsSeeNew = !this.passwordIsSeeNew;
        },
        passwordIconClickNew2() {
            this.passwordIsSeeNew2 = !this.passwordIsSeeNew2;
        },
        changeHandle() {
            if (this.from.password_new === '') {
                _mm.errorDialog('请输入新密码');
                return false;
            }
            if (this.from.password_new2 === '') {
                _mm.errorDialog('请输入确认密码');
                return false;
            }
            if (this.from.password_new !== this.from.password_new2) {
                _mm.errorDialog('新密码和确认密码不一致');
                return false;
            }
            this.ResetUserSalaryPwd(this.from).then((res) => {
                _mm.confirmDialog(res.msg, () => {
                    this.$router.history.go(-1);
                });
            }).catch(err => {
                _mm.errorDialog(err);
            });
        }
    },
    mounted() {
        _mm.checkIsLogin();
    }
}
</script>

<style lang="less" scoped>
    .change-pwd-box{
        .btn-box{
            width: 95%;
            margin: 30px auto;
        }
    }
</style>
