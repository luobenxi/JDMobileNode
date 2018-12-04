<template>
    <div id="login-box">
        <div class="logo">
            <img src="../../static/images/logo.gif" width="128">
        </div>
        <van-cell-group>
            <van-field v-model="from.username" icon="contact" @click-icon="$toast('用户名/员工编号')"
                       @keyup.13="keyUpUserName" placeholder="请输入用户名/员工编号"/>
            <van-field v-model="from.password" :icon="passwordIcon" @click-icon="passwordIconClick"
                       :type="passwordType" ref="refPwd" @keyup.13="keyUpPwd" placeholder="请输入密码"/>
        </van-cell-group>
        <div class="login-btn">
            <van-button type="primary" class="btn-font" :disabled="btnDisabled" block @click="loginHandle">登 录</van-button>
            <van-loading class="loading-box" v-if="btnDisabled" color="#909399"/>
        </div>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    import MUtil from '../util/mm.js';

    const _mm = new MUtil();

    export default {
        name: 'JdLogin',
        data() {
            return {
                passwordIsSee: false,
                btnDisabled: false,
                from: {
                    username: '',
                    password: ''
                }
            }
        },
        computed: {
            passwordIcon() {
                return this.passwordIsSee ? 'password-view' : 'password-not-view';
            },
            passwordType() {
                return this.passwordIsSee ? 'text' : 'password';
            }
        },
        methods: {
            ...mapActions([
                'LoginCheckHandle',
            ]),
            passwordIconClick() {
                this.passwordIsSee = !this.passwordIsSee;
            },
            keyUpUserName() {
                if (!this.from.password) {
                    let refPwd = this.$refs.refPwd;
                    refPwd.focus(); // 密码为空时 将焦点移到密码输入框
                } else {
                    this.loginHandle();
                }
            },
            keyUpPwd() {
                this.loginHandle();
            },
            // 登录处理
            loginHandle() {
                if (this.from.username === '') {
                    _mm.errorDialog('请输入用户名/员工编号');
                    return false;
                }
                if (this.from.password === '') {
                    _mm.errorDialog('请输入密码');
                    return false;
                }
                this.btnDisabled = true;
                this.LoginCheckHandle(this.from).then((res) => {
                    this.btnDisabled = false;
                    // setStorage
                    // _mm.setStorage('user.token', res.ID || '');
                    // _mm.setStorage('user.username', res.UserName || '');
                    // _mm.setStorage('user.info', res || '');

                    // setCookie
                    // document.cookie = `user.token=${res.ID}`;
                    // document.cookie = `user.username=${res.UserName}`;
                    // document.cookie = `user.info=${JSON.stringify(res)}`;
                    this.$router.push('/home');
                },
                err => {
                    this.btnDisabled = false;
                    _mm.errorTips(err || '');
                });
            }
        },
        mounted() {
            // let token = _mm.getStorage('user.token');
            // let info = _mm.getStorage('user.info');
            // if (token && info) {
            //     this.$router.push('/home');
            // }
            // this.from.username = _mm.getStorage('user.username');
            let Cookie = _mm.getCookie(_mm.CookieKeys_UserInfo());
            if (Cookie) {
                this.$router.push('/home');
            } else {
                window.location.href = _mm.GetLoginPageUrl(); // 使用旧页面
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../style/pages/login.less";
</style>
