<template>
    <div class="user-info-box">
        <jd-header title="个人中心"></jd-header>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">姓名</van-col>
                <van-col>{{from.FullName}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">用户名</van-col>
                <van-col>{{from.UserName}}</van-col>
            </van-row>
        </van-cell>
        <van-cell v-if="from.Email">
            <van-row gutter="10">
                <van-col :span="6">邮箱</van-col>
                <van-col>{{from.Email}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">编号</van-col>
                <van-col>JD{{from.ErpID}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">公司</van-col>
                <van-col>{{from.Depart1Name}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">部门</van-col>
                <van-col>{{from.DepartName}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">状态</van-col>
                <van-col>{{from.IsAble ? '正常' : '禁用'}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">登录次数</van-col>
                <van-col>{{from.LoginCount}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">最后一次登录时间</van-col>
                <van-col>{{from.LastVisitDate}}</van-col>
            </van-row>
        </van-cell>
        <van-cell></van-cell>
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
        name: 'JdUserInfo',
        data() {
            return {
                from: {}
            }
        },
        computed: {},
        components: {
            [header.name]: header
        },
        methods: {
            ...mapActions([
                'GetUserInfo',
            ]),
        },
        mounted() {
            _mm.checkIsLogin();
            this.GetUserInfo().then(res => {
                this.from = Object.assign({}, res, {
                    IsAble: Boolean(res.IsAble),
                    LoginCount: parseInt(res.LoginCount),
                });
            });
        }
    }
</script>

<style lang="less" scoped>
    .user-info-box {
    }
</style>
