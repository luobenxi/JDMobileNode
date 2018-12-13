<template>
    <div class="AnnualLeaveList-box">
        <jd-header title="剩余休假" :backUrl="backUrl"></jd-header>
        <van-tabs v-model="active">
            <van-tab title="加班"></van-tab>
            <van-tab title="年假"></van-tab>
        </van-tabs>
        <van-cell-group v-if="from.DepartName">
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="12">所属部门</van-col>
                    <van-col>{{from.DepartName}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="12">员工姓名</van-col>
                    <van-col>{{from.FullName}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row gutter="10">
                    <van-col :span="12">员工职务</van-col>
                    <van-col>{{from.PostName}}</van-col>
                </van-row>
            </van-cell>
            <van-collapse v-model="activeNamesJiaBan" v-if="active === 0">
                <van-collapse-item title="上年度剩余加班" name="1">
                    <van-cell>
                        <van-row gutter="10">
                            <van-col :span="12">上一年剩余加班</van-col>
                            <van-col>{{from.JiaBanLastYear}} 小时</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="12">调休上一年剩余加班</van-col>
                            <van-col>{{from.JiaBanTiaoXiuLastYear}} 小时</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="12">上一年剩余加班工资</van-col>
                            <van-col>{{from.JiaBanFaQianLastYear}} 小时</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="12">剩余上一年加班</van-col>
                            <van-col>{{from.JiaBanShengYuLastYear}} 小时</van-col>
                        </van-row>
                    </van-cell>
                </van-collapse-item>
                <van-collapse-item title="今年加班合计" name="2">
                    <van-cell>
                        <van-row gutter="10">
                            <van-col :span="12">已调休今年加班</van-col>
                            <van-col>{{from.JiaBanTiaoXiu}} 小时</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="12">已发今年加班工资</van-col>
                            <van-col>{{from.JiaBanFaQian}} 小时</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="12">今年剩余加班</van-col>
                            <van-col>{{from.JiaBanShengYu}} 小时</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="12">今年和上一年剩余加班</van-col>
                            <van-col>{{from.JiaBanShengYuLastYear + from.JiaBanShengYu}} 小时</van-col>
                        </van-row>
                    </van-cell>
                </van-collapse-item>
            </van-collapse>
            <van-collapse v-model="activeNamesYearRest" v-if="active === 1">
                <van-collapse-item title="上年度结余年假" name="1">
                    <van-cell>
                        <van-row gutter="10">
                            <van-col :span="12">结余天数</van-col>
                            <van-col>{{from.LastNianjia}} 天</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="12">今年休上一年剩余年假</van-col>
                            <van-col>{{from.LastNianjiaYixiu}} 天</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="12">剩余上一年年假</van-col>
                            <van-col>{{from.LastNianjiaShengYu}} 天</van-col>
                        </van-row>
                    </van-cell>
                </van-collapse-item>
                <van-collapse-item title="今年年假" name="2">
                    <van-cell>
                        <van-row gutter="10">
                            <van-col :span="12">今年年假</van-col>
                            <van-col>{{from.Nianjia}} 天</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="12">已休今年年假</van-col>
                            <van-col>{{from.NianjiaYixiu}} 天</van-col>
                        </van-row>
                        <van-row gutter="10">
                            <van-col :span="12">剩余今年年假</van-col>
                            <van-col>{{from.NianjiaShengYu}} 天</van-col>
                        </van-row>
                    </van-cell>
                </van-collapse-item>
            </van-collapse>
        </van-cell-group>
        <van-loading class="loading-box" v-else />
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import header from '../../components/common/header.vue';
    import MUtil from '../../util/mm.js';
    import BizUtil from '../../util/bizUtil';

    const _mm = new MUtil();
    const _bizUtil = new BizUtil();

    export default {
        components: {
            [header.name]: header
        },
        data() {
            return {
                backUrl: _mm.GetEmployeeSelfHelpUrl(),
                active: 0,
                activeNamesJiaBan: [],
                activeNamesYearRest: [],
                from: {}
            }
        },
        methods: {
            ...mapActions([
                'GetPersonWorkAnnualLeaveList',
            ]),
        },
        mounted() {
            _mm.checkIsLogin();
            this.GetPersonWorkAnnualLeaveList().then((res) => {
                _bizUtil.getAllUserInfoFromApiOrLocalPromise().then((userInfo) => {
                    this.from = Object.assign({}, this.from, res.data, {
                        DepartName: userInfo.user.DepartName,
                        FullName: userInfo.user.FullName,
                        PostName: userInfo.userFile.PostName,
                    });
                });
            });
        }
    }
</script>

<style lang="less" scoped>
    @import "../../style/pages/AnnualLeave/AnnualLeaveList";
</style>
