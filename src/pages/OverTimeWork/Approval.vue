<template>
    <div>
        <jd-header :title="title"></jd-header>
        <OverTimeWorkCommon
            :model="model"
            :detailList="detailList"
            :workFlowList="workFlowList"
        >
        </OverTimeWorkCommon>
        <div class="sub-btn" v-if="IsShowBtn">
            <van-button type="primary" class="btn-item" v-if="hasNext" block @click="ApprovePassHandle">审批通过</van-button>
            <van-button type="primary" class="btn-item" v-if="!hasNext" block @click="ApproveFinishHandle">通过并结束流程</van-button>
            <van-button type="danger" class="btn-item" block @click="ApproveRefuseHandle">拒绝并结束流程</van-button>
            <van-button type="danger" class="btn-item" block plain @click="ApproveReturnHandle">退回之前审批人</van-button>
        </div>
        <!--审批通过组件-->
        <ApprovePass :popupIsShow="ApprovePassIsShow" :ApproveStepsList="ApproveStepsList" :ParamID="ParamID"
        @successOperation="JumpPageHandle">
        </ApprovePass>
        <!--审批结束组件-->
        <ApproveFinish :popupIsShow="ApproveFinishIsShow" :ApproveStepsList="ApproveStepsList" :ParamID="ParamID"
        @successOperation="JumpPageHandle"></ApproveFinish>
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
    import OverTimeWorkCommon from './Common';
    import ApprovePass from '../../components/biz/Approve/ApprovePass';
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
                title: '加班单审批',
                from: {},
                IsShowBtn: true, // 按钮组是否显示
                wfDetailId: '', // 流程详情ID
                fromStatus: '62',

                hasNext: false,

                model: {},
                detailList: [],
                workFlowList: [],

                ApprovePassIsShow: false, // 审批通过
                ApproveFinishIsShow: false, // 审批通过并完成
                ApproveRefuseIsShow: false, // 审批拒绝
                ApproveReturnIsShow: false, // 审批退回
                ApproveStepsList: [], // 步骤审批用户列表
                ParamID: {}, // 数据参数ID
            }
        },
        components: {
            [header.name]: header,
            [ApprovePass.name]: ApprovePass,
            [ApproveFinish.name]: ApproveFinish,
            [ApproveRefuse.name]: ApproveRefuse,
            [ApproveReturn.name]: ApproveReturn,
            [OverTimeWorkCommon.name]: OverTimeWorkCommon,
        },
        methods: {
            ...mapActions([
                'GetOverTimeWorkByWfDetailId', // 根据工作流ID获取加班单明细
                'GetWorkFlowApproveUserList', // 获取流程审批人列表
                'ApprovePass',
                'GetApprovePassUserList',
                'ApproveReturn',
            ]),
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
                }).catch(err => {
                    _mm.errorDialog(err);
                });
            },
            ApproveFinishHandle() {
                let wfDetailId = this.wfDetailId;
                if (!wfDetailId) {
                    _mm.errorDialog('参数为空');
                    return;
                }
                this.ParamID = {
                    wfDetailID: wfDetailId
                }; // 参数赋值
                this.ApproveFinishIsShow = !this.ApproveFinishIsShow;
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
                if (!this.wfDetailId) {
                    _mm.errorDialog('参数为空，请联系管理员');
                    return;
                }
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
                    this.GetOverTimeWorkByWfDetailId(wfDetailId).then((res) => {
                        this.model = Object.assign({}, res.model, res.userInfo);// 请假单信息
                        this.detailList = res.detailList;// 公出单明细
                        this.workFlowList = res.workFlowList;// 审批信息
                        let CurrentUserID = res.CurrentUserID; // 当前用户ID
                        this.hasNext = res.hasNext; // 是否有下一步骤
                        let CurrentUserArr = res.workFlowList.filter((item) => {
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
