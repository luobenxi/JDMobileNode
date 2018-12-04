<template>
    <div id="ConfirmReason-box">
        <jd-header title="考勤异常确认" backUrl="/AttendanceApi/PersonAbnormalList"></jd-header>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="9">姓名</van-col>
                <van-col>{{from.FullName}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="9">考勤日期</van-col>
                <van-col>{{from.Date}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="9">应打卡时间1</van-col>
                <van-col>{{from.ShouldTime1}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="9">实际打卡时间1</van-col>
                <van-col>{{from.FactTime1}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="9">应打卡时间2</van-col>
                <van-col>{{from.ShouldTime2}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="9">实际打卡时间2</van-col>
                <van-col>{{from.FactTime2}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="9">是否异常</van-col>
                <van-col>{{from.IsAbnormal}}</van-col>
            </van-row>
        </van-cell>
        <van-cell v-if="IsConfirm">
            <van-row gutter="10">
                <van-col :span="9">异常原因</van-col>
                <van-col>{{from.AbnormalReson}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="9">状态</van-col>
                <van-col>{{from.StatusText}}</van-col>
            </van-row>
        </van-cell>
        <van-cell v-if="IsConfirm"></van-cell>
        <div class="select-box" v-if="!IsConfirm">
            <van-tree-select
                :items="items"
                :active-id="AbnormalResult"
                @navclick="onNavClick"
                @itemclick="onItemClick"
            />
        </div>
        <div class="login-btn" v-if="!IsConfirm">
            <van-button type="primary" block @click="ConfirmHandle">确 认</van-button>
        </div>
    </div>
</template>

<script>
import {
    mapActions
} from 'vuex';
import header from '../../components/common/header.vue';
import MUtil from '../../util/mm.js';
import { Dialog } from 'vant';

const _mm = new MUtil();

export default {
    data () {
        return {
            items: [],
            from: {},
            AbnormalResultOld: 0,
            AbnormalResult: 0,
            ID: 0,
            IsConfirm: false,
        }
    },
    components: {
        [header.name]: header,
    },
    computed: {
    },
    methods: {
        ...mapActions([
            'GetPersonAbnormalModelByID',
            'GetDictListByParent',
            'ConfirmAttendanceAbnormalReason',
        ]),
        onNavClick(index) {
        },
        onItemClick(data) {
            this.AbnormalResult = data.id;
        },
        ConfirmHandle() {
            if (this.AbnormalResultOld !== this.AbnormalResult) {
                Dialog.confirm({
                    title: '提示',
                    message: '你选择的考勤异常原因与系统自动判断的原因不一致，你确认提交吗？'
                }).then(() => {
                    this.ConfirmHandleSubmit();
                }).catch(() => {
                });
            } else {
                this.ConfirmHandleSubmit();
            }
        },
        ConfirmHandleSubmit() {
            let data = {
                ID: this.ID,
                AbnormalResult: this.AbnormalResult,
            };
            this.ConfirmAttendanceAbnormalReason(data).then((res) => {
                if (res.success) {
                    _mm.successDialog(res.msg);
                    this.paramsInit();
                } else {
                    _mm.errorDialog(res.msg);
                }
            });
        },
        InitDictListByParent() {
            let data = {
                ParentID: 443 // 字典表ID=443的记录为考勤异常原因
            };
            this.GetDictListByParent(data).then((res) => {
                if (res.length > 0) {
                    this.items.push(
                        {
                            id: 443,
                            text: '考勤异常原因',
                            children: []
                        }
                    );
                    this.items[0].children = res.map((item) => {
                        return Object.assign({}, {
                            id: parseInt(item.ID),
                            text: item.DictName,
                            children: item.Childs,
                        });
                    });
                }
            });
        },
        paramsInit() {
            let params = this.$route.params;
            this.ID = parseInt(params.ID);
            this.GetPersonAbnormalModelByID(this.ID).then((res) => {
                this.from = Object.assign({}, res, {
                    StatusText: res.Status === '1' ? '已确认' : '未确认',
                    Date: _mm.formatStrDate(res.Date),
                    IsAbnormal: Boolean(res.IsAbnormal) ? '是' : '否',
                });
                if (this.from.Status === '1') {
                    // 已确认
                    this.IsConfirm = true;
                }
                this.AbnormalResult = parseInt(res.AbnormalResult);
                this.AbnormalResultOld = parseInt(res.AbnormalResult);
            });
        }
    },
    mounted() {
        this.paramsInit();
        this.InitDictListByParent();
    }
}
</script>

<style lang="less" scoped>
</style>
