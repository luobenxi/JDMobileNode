<template>
    <div>
        <jd-header :title="title"></jd-header>
        <AskForLeaveCancelApprovalCommon
                :from="from"
                :dateDetailList="dateDetailList"
                :uploadFinishList="uploadFinishList"
                :workFlowsDetailList="workFlowsDetailList"
        >
        </AskForLeaveCancelApprovalCommon>
        <div class="sub-btn" v-if="IsShowBtn">
            <van-button type="primary" class="btn-item" block @click="ApprovePassHandle">审批通过</van-button>
            <van-button type="danger" class="btn-item" block @click="ApproveRefuseHandle">拒绝并结束流程</van-button>
            <van-button type="danger" class="btn-item" block plain @click="ApproveReturnHandle">退回之前审批人</van-button>
        </div>
        <!--开始审批组件-->
        <ApprovePass :popupIsShow="ApprovePassIsShow" :ApproveStepsList="ApproveStepsList" :ParamID="ParamID"
        @successOperation="JumpPageHandle">
        </ApprovePass>
        <!--审批拒绝-->
        <ApproveRefuse :popupIsShow="ApproveRefuseIsShow" :ParamID="ParamID"
        @successOperation="JumpPageHandle"></ApproveRefuse>
        <!--审批退回-->
        <ApproveReturn :popupIsShow="ApproveReturnIsShow" :ApproveStepsList="ApproveStepsList" :ParamID="ParamID"
        @successOperation="JumpPageHandle"></ApproveReturn>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    import header from '../../components/common/header';
    import AskForLeaveCancelApprovalCommon from './AskForLeaveCancelApprovalCommon';
    import ApprovePass from '../../components/biz/Approve/ApprovePass';
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
                title: '销假单审批',
                from: {
                    ID: '',
                    Reason: '', // 原因
                },
                IsShowBtn: true, // 按钮组是否显示
                wfDetailId: '', // 流程详情ID
                model: {}, // 存放一条记录
                fromStatus: '62',
                uploadFinishList: [],
                dateDetailList: [],
                workFlowsDetailList: [],

                ApprovePassIsShow: false, // 审批通过
                ApproveRefuseIsShow: false, // 审批拒绝
                ApproveReturnIsShow: false, // 审批退回
                ApproveStepsList: [], // 步骤审批用户列表
                ParamID: {}, // 数据参数ID
            }
        },
        components: {
            [header.name]: header,
            [ApprovePass.name]: ApprovePass,
            [ApproveRefuse.name]: ApproveRefuse,
            [ApproveReturn.name]: ApproveReturn,
            [AskForLeaveCancelApprovalCommon.name]: AskForLeaveCancelApprovalCommon,
        },
        computed: {
        },
        methods: {
            ...mapActions([
                'GetAskForLeaveCancelByWfDetailId', // 销假单
                'ApprovePass', // 审批通过
                'GetApprovePassUserList', // 获取审批人列表
                'ApproveReturn', // 审批退回
            ]),
            // 审批通过
            ApprovePassHandle() {
                let wfDetailId = this.wfDetailId;
                if (!wfDetailId) {
                    _mm.errorDialog('参数为空');
                    return;
                }
                this.ApprovePass(wfDetailId).then(res => {
                    let data = {
                        CreateUserID: res.CreateUserID,
                        PrvUserID: res.PrvUserID,
                        KeyID: res.model.KeyID,
                        ActiveID: res.nextActives.length ? res.nextActives[0].ID : '',
                    };
                    let ParamID = {
                        wfDetailID: wfDetailId,
                        isSubmitNext: res.isSubmitNext,
                        nextActiveId: data.ActiveID,
                    };
                    // 获取审批人列表
                    this.GetApprovePassUserList(data).then(res => {
                        if (res.success) {
                            this.ApproveStepsList = res.data;
                            this.ParamID = ParamID; // 参数赋值
                            this.ApprovePassIsShow = !this.ApprovePassIsShow;
                        } else {
                            _mm.errorDialog(res.msg);
                        }
                    });
                });
            },
            JumpPageHandle() {
                let url = _mm.getStorage(_mm.GetCurrentToDoCategoryUrlKey());
                if (url) {
                    this.$router.push(url, () => {
                        this.$router.go(0);
                    });
                } else {
                    this.paramsInit();
                }
            },
            ApproveRefuseHandle() {
                this.ParamID = {
                    ID: this.wfDetailId
                };
                this.ApproveRefuseIsShow = !this.ApproveRefuseIsShow;
            },
            ApproveReturnHandle() {
                let wfDetailId = this.wfDetailId;
                if (!wfDetailId) {
                    _mm.errorDialog('参数错误，请联系管理员');
                    return;
                }
                this.ApproveReturn(wfDetailId).then((res) => {
                    if (res.data.WorkFlowDetails.length) {
                        this.ParamID = {
                            wfDetailId: this.wfDetailId
                        };
                        // 是否是否为第一个审批人
                        this.ApproveStepsList = res.data.WorkFlowDetails.filter((item) => {
                            // 审批人和插入人 !== 当前用户
                            // return item.ExecPersons !== res.data.CurrentUserID && item.InsertUserID !== res.data.CurrentUserID && parseInt(item.QueueSort) < MaxQueueSort;
                            return item.ExecPersons !== res.data.CurrentUserID;
                        });
                        if (this.ApproveStepsList.length === 0) {
                            _mm.errorDialog('您是第一位审批人，没有上一位审批人，无法退回。您可以拒绝直接退给发起人。');
                        } else {
                            this.ApproveReturnIsShow = !this.ApproveReturnIsShow;
                        }
                    } else {
                        _mm.errorDialog('您是第一位审批人，没有上一位审批人，无法退回。您可以拒绝直接退给发起人。');
                    }
                });
            },
            paramsInit() {
                let params = this.$route.params;
                if (params.wfDetailId !== undefined) {
                    let wfDetailId = params.wfDetailId;
                    this.wfDetailId = wfDetailId;
                    this.GetAskForLeaveCancelByWfDetailId(wfDetailId).then((res) => {
                        this.model = res.model;
                        this.from = res.model; // 请假单信息
                        this.dateDetailList = res.detailList;// 请假单明细
                        this.uploadFinishList = res.attachList;// 请假单附件列表
                        this.workFlowsDetailList = res.workFlowsDetailList;// 审批信息
                        let CurrentUserID = res.CurrentUserID;
                        let CurrentUserArr = res.workFlowsDetailList.filter((item) => {
                            return item.ExecPersons === CurrentUserID;
                        });
                        let IsShowBtn = CurrentUserArr.length === 1 ? CurrentUserArr[0].IsCurrent : CurrentUserArr[CurrentUserArr.length - 1].IsCurrent; // 控制按钮组是否显示
                        this.IsShowBtn = IsShowBtn === 'False'; // 控制按钮组是否显示
                        this.fromStatus = res.model.Status; // 状态
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
</style>
