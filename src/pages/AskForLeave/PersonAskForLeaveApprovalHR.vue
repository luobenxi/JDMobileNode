<template>
    <div id="OutCompanyAdd-box">
        <jd-header :title="title"></jd-header>
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
        <div class="sub-btn" v-if="IsShowBtn">
            <!--保存-->
            <!--<van-button type="primary" class="btn-item" block @click="SaveHandle">保 存</van-button>-->
            <van-button type="primary" class="btn-item" block @click="ApproveFinishHandle">通过并结束流程</van-button>
            <van-button type="danger" class="btn-item" block @click="ApproveRefuseHandle">拒绝并结束流程</van-button>
            <van-button type="danger" class="btn-item" block plain @click="ApproveReturnHandle">退回之前审批人</van-button>
        </div>
        <!--审批结束组件-->
        <ApproveFinish :popupIsShow="ApproveFinishIsShow" :ApproveStepsList="ApproveStepsList" :ParamID="ParamID"></ApproveFinish>
        <!--审批拒绝-->
        <ApproveRefuse :popupIsShow="ApproveRefuseIsShow"></ApproveRefuse>
        <!--审批退回-->
        <ApproveReturn :popupIsShow="ApproveReturnIsShow"></ApproveReturn>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    import header from '../../components/common/header';
    import fileList from '../../components/common/file-list';
    import ApproveFinish from '../../components/biz/Approve/ApproveFinish';
    import ApproveRefuse from '../../components/biz/Approve/ApproveRefuse';
    import ApproveReturn from '../../components/biz/Approve/ApproveReturn';
    import MUtil from '../../util/mm';
    import BizUtil from '../../util/bizUtil';
    import { Dialog } from 'vant';

    const _mm = new MUtil();
    const _bizUtil = new BizUtil();

    export default {
        data () {
            return {
                title: '请假单审批',
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

                ApproveFinishIsShow: false, // 审批结束
                ApproveRefuseIsShow: false, // 审批拒绝
                ApproveReturnIsShow: false, // 审批退回
                ApproveStepsList: [], // 步骤审批用户列表
                ParamID: {}, // 数据参数ID

                pickerIsShow: false,
                AskTypeOption: _bizUtil.GetAskTypeOption(),
                AmPmTypeOption: _bizUtil.GetAmPmTypeOption(),
            }
        },
        components: {
            [header.name]: header,
            [fileList.name]: fileList,
            [ApproveFinish.name]: ApproveFinish,
            [ApproveRefuse.name]: ApproveRefuse,
            [ApproveReturn.name]: ApproveReturn,
        },
        computed: {
        },
        methods: {
            ...mapActions([
                'GetAskForLeaveDetailByWfDetailId',
                'GetWorkFlowApproveUserList', // 获取流程审批人列表
                'ApprovePass', // ApprovePass
                'GetApprovePassUserList', // GetApprovePassUserList
            ]),
            // 审批结束
            ApproveFinishHandle() {
                let wfDetailId = this.wfDetailId;
                if (!wfDetailId) {
                    _mm.errorDialog('参数为空');
                    return;
                }
                let ParamID = {
                    wfDetailID: wfDetailId
                };
                this.ParamID = ParamID; // 参数赋值
                this.ApproveFinishIsShow = !this.ApproveFinishIsShow;
            },
            ApproveRefuseHandle() {
                this.ApproveRefuseIsShow = !this.ApproveRefuseIsShow;
            },
            ApproveReturnHandle() {
                this.ApproveReturnIsShow = !this.ApproveReturnIsShow;
            },
            paramsInit() {
                let params = this.$route.params;
                if (params.wfDetailId !== undefined) {
                    // Edit
                    let wfDetailId = params.wfDetailId;
                    this.wfDetailId = wfDetailId;
                    this.GetAskForLeaveDetailByWfDetailId(wfDetailId).then((res) => {
                        let CurrentUserID = res.CurrentUserID;
                        let CurrentUserArr = res.workFlowsDetailList.filter((item) => {
                            return item.ExecPersons === CurrentUserID;
                        });
                        let IsShowBtn = CurrentUserArr.length === 1 ? CurrentUserArr[0].IsCurrent : 'True'; // 控制按钮组是否显示
                        this.IsShowBtn = IsShowBtn === 'False'; // 控制按钮组是否显示
                        this.from = Object.assign({}, res.model, {
                            DepartName: '信息部',
                            UserFullName: res.model.UserFullName,
                            DocNumb: res.user.DocNumb,
                            PostName: res.user.PostName,
                            EntrantDate: _mm.formatDate(res.user.EntrantDate),
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
                        this.workFlowsDetailList = res.workFlowsDetailList.map((item) => {
                            return Object.assign({}, item, {
                                OperatorTypeText: _bizUtil.JDApproveStatusMap(item.OperatorType),
                                OperatorTime: _mm.formatDate(item.OperatorTime),
                            })
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
