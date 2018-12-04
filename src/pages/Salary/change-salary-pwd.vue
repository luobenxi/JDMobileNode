<template>
    <div class="change-pwd-box">
        <jd-header title="修改工资查询密码"></jd-header>
        <div class="input-box">
            <van-cell-group>
                <van-field v-model="from.password_old" :icon="passwordIconOld" @click-icon="passwordIconClickOld" :type="passwordTypeOLd" placeholder="请输入原密码" />
                <van-field v-model="from.password_new" :icon="passwordIconNew" @click-icon="passwordIconClickNew" :type="passwordTypeNew" placeholder="请输入新密码" />
                <van-field v-model="from.password_new2" :icon="passwordIconNew2" @click-icon="passwordIconClickNew2" :type="passwordTypeNew2" placeholder="请输入确认密码" />
            </van-cell-group>
        </div>
        <div class="btn-box">
            <van-button type="danger" block @click="changeHandle">确认修改</van-button>
        </div>
    </div>
</template>

<script>
import {
    mapActions
} from 'vuex';
import header from '../../components/common/header.vue';
import MUtil from '../../util/mm.js';

const _mm = new MUtil();

export default {
    name: 'JdChangeSalaryPwd',
    data () {
        return {
            passwordIsSeeOld: false,
            passwordIsSeeNew: false,
            passwordIsSeeNew2: false,
            from: {
                password_old: '',
                password_new: '',
                password_new2: '',
            }
        }
    },
    computed: {
        passwordIconOld() {
            return this.passwordIsSeeOld ? 'password-view' : 'password-not-view';
        },
        passwordIconNew() {
            return this.passwordIsSeeNew ? 'password-view' : 'password-not-view';
        },
        passwordIconNew2() {
            return this.passwordIsSeeNew2 ? 'password-view' : 'password-not-view';
        },
        passwordTypeOLd() {
            return this.passwordIsSeeOld ? 'text' : 'password';
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
            'UpdateUserSalaryPwd',
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
            if (this.from.password_old === '') {
                _mm.errorDialog('请输入原密码');
                return false;
            }
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
            this.UpdateUserSalaryPwd(this.from).then((res) => {
                _mm.successDialog(res.msg);
                this.$router.history.go(-1);
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
