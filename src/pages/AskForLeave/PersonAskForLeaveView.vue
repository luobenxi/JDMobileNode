<template>
    <div id="OutCompanyAdd-box">
        <jd-header :title="title" backUrl="/AskForLeaveApi/PersonAskForLeaveList"></jd-header>
        <van-cell-group>
            <van-field v-model="from.DepartName" label="部门" disabled />
            <van-field v-model="from.UserFullName" label="姓名" disabled />
            <van-field v-model="from.DocNumb" label="编号" disabled />
            <van-field v-model="from.PostName" label="岗位" disabled />
            <van-field v-model="from.EntrantDate" label="入职日期" disabled />
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="from.Reason" disabled label="请假原因" type="textarea" placeholder="请输入请假原因" rows="2" autosize />
        </van-cell-group>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">状态</van-col>
                <van-col :span="18">{{from.StatusText}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">请假时间</van-col>
            </van-row>
        </van-cell>
        <van-cell v-if="DateDetailArr.length">
            <van-row type="flex" v-for="(item, index) in DateDetailArr" :key="index" justify="space-around" class="DateArrRow">
                <van-col span="6">{{item.Date}}</van-col>
                <van-col span="6">
                    <select v-model="item.AskType" class="select-css" disabled>
                        <option v-for="itemOption in AskTypeOption" :key="itemOption.id" :value="itemOption.id">{{itemOption.text}}</option>
                    </select>
                </van-col>
                <van-col span="6">
                    <select v-model="item.AmPmType" class="select-css" disabled>
                        <option v-for="itemOption in AmPmTypeOption" :key="itemOption.id" :value="itemOption.id">{{itemOption.text}}</option>
                    </select>
                </van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">审批信息</van-col>
            </van-row>
        </van-cell>
        <van-cell v-if="workFlowsDetailList.length">
            <van-row type="flex" justify="space-around" v-for="(item, index) in workFlowsDetailList" :key="index">
                <van-col :span="11">{{index + 1}}.{{item.ActiveName}}</van-col>
                <van-col :span="4">{{item.ExecPersonNames}}</van-col>
                <!--已通过-->
                <van-col :span="4" v-if="item.OperatorType === '63'" style="color: #67C23A">{{item.OperatorTypeText}}</van-col>
                <!--已拒绝-->
                <van-col :span="4" v-if="item.OperatorType === '64'" style="color: #F56C6C">{{item.OperatorTypeText}}</van-col>
                <!--除了 已通过、已拒绝-->
                <van-col :span="4" v-if="item.OperatorType !== '63' && item.OperatorType !== '64'">{{item.OperatorTypeText}}</van-col>
                <van-col :span="5">{{item.OperatorTime}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">附件列表</van-col>
            </van-row>
        </van-cell>
        <van-cell v-if="UploadFinishList.length">
            <jd-file-list :InitFileList="UploadFinishList"></jd-file-list>
        </van-cell>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    import header from '../../components/common/header';
    import fileList from '../../components/common/file-list';
    import MUtil from '../../util/mm';
    import BizUtil from '../../util/bizUtil';
    import { Dialog } from 'vant';

    const _mm = new MUtil();
    const _bizUtil = new BizUtil();

    export default {
        data () {
            return {
                title: '请假单查看',
                from: {
                    ID: '',
                    Reason: '', // 原因
                },
                IsShowBtn: true, // 按钮组是否显示
                wfDetailId: '', // 流程详情ID
                model: {}, // 存放一条记录
                fromStatus: '61',
                UploadFinishList: [],
                DateDetailArr: [],
                DateArr: [],
                workFlowsDetailList: [],
                pickerIsShow: false,
                AskTypeOption: _bizUtil.GetAskTypeOption(),
                AmPmTypeOption: _bizUtil.GetAmPmTypeOption(),
            }
        },
        components: {
            [header.name]: header,
            [fileList.name]: fileList,
        },
        computed: {
        },
        methods: {
            ...mapActions([
                'GetAskForLeaveByKey',
            ]),
            paramsInit() {
                let params = this.$route.params;
                if (params.ID !== undefined) {
                    let ID = params.ID;
                    this.GetAskForLeaveByKey(ID).then((res) => {
                        // 请假单信息
                        this.from = Object.assign({}, res.model, res.userInfo, {
                            StatusText: _bizUtil.JDApproveStatusMap(res.model.Status),
                            EntrantDate: _mm.formatDate(res.userInfo.EntrantDate),
                            Reason: res.model.Reson
                        });
                        this.fromStatus = res.model.Status; // 状态
                        // 请假单明细
                        res.detailList.map((item) => {
                            this.DateDetailArr.push({
                                Date: _mm.formatStrDate(item.TheDay),
                                AskType: parseInt(item.AskForLeaveTypeID),
                                AmPmType: parseInt(item.AMPM)
                            });
                        });
                        // 请假单附件列表
                        res.attachList.map((item) => {
                            this.UploadFinishList.push({
                                SavePath: item.FilePath,
                                name: item.FileName
                            });
                        });
                        // 审批信息
                        this.workFlowsDetailList = res.workFlowsDetailList.map((item) => {
                            return Object.assign({}, item, {
                                OperatorTypeText: _bizUtil.JDApproveStatusMap(item.OperatorType),
                                OperatorTime: _mm.formatDate(item.OperatorTime),
                            });
                        });
                    });
                }
            },
        },
        mounted() {
            this.paramsInit();
        }
    }
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
    @import "../../style/pages/OutCompany/Add";
</style>
