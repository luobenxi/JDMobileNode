<template>
    <div>
        <jd-header title="请假单提交确认"></jd-header>
        <PersonAskForLeaveCommon
            :from="from"
            :dateDetailList="dateDetailList"
            :uploadFinishList="uploadFinishList"
            :workFlowsDetailList="workFlowsDetailList"
        >
        </PersonAskForLeaveCommon>
        <div class="sub-btn">
            <van-button type="primary" class="btn-item" v-if="fromStatus==='61'" block @click="confirmSubmitHandle">确认提交</van-button>
            <van-button type="primary" class="btn-item" v-if="fromStatus==='61'" plain block @click="backEdit">返回修改</van-button>
        </div>
        <!--开始审批组件-->
        <ApproveStart
              :popupIsShow="ApproveStartIsShow"
              :ApproveStepsList="ApproveStepsList"
              :model="model"
              :ParamID="ParamID"
              :submitSuccessJumpUrl="submitSuccessJumpUrl">
        </ApproveStart>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    import header from '../../components/common/header';
    import PersonAskForLeaveCommon from './PersonAskForLeaveCommon';
    import ApproveStart from '../../components/biz/Approve/ApproveStart';
    import MUtil from '../../util/mm';
    import BizUtil from '../../util/bizUtil';

    const _mm = new MUtil();
    const _bizUtil = new BizUtil();

    export default {
        data () {
            return {
                fromStatus: '61',
                ApproveStartIsShow: false, // 开始审批
                ApproveStepsList: [], // 步骤审批用户列表
                ParamID: {}, // 数据参数ID
                model: {}, // 存放一条记录

                from: {},
                dateDetailList: [],
                uploadFinishList: [],
                workFlowsDetailList: [],

                submitSuccessJumpUrl: ''
            }
        },
        components: {
            [header.name]: header,
            [ApproveStart.name]: ApproveStart,
            [PersonAskForLeaveCommon.name]: PersonAskForLeaveCommon,
        },
        computed: {
        },
        methods: {
            ...mapActions([
                'GetAskForLeaveByKey',
                'GetWorkFlowApproveUserList',
            ]),
            confirmSubmitHandle() {
                // 获取流程审批人列表
                let data = {
                    FormID: '1',
                    KeyID: this.model.ID,
                    DepartID: this.model.DepartID,
                    WorkTitle: this.model.Title,
                    InsertUserID: this.model.InsertUserID,
                    IsReSubmit: 'false'
                };
                if (data.KeyID === undefined) {
                    _mm.errorDialog('参数KeyID为空');
                    return;
                }
                this.GetWorkFlowApproveUserList(data).then(res => {
                    this.ApproveStepsList = res.UserList; // 数据赋值
                    this.ParamID = res.ParamID; // 数据赋值
                    this.ApproveStartIsShow = !this.ApproveStartIsShow; // 显示弹出层
                });
            },
            backEdit() {
                let ID = this.from.ID;
                if (ID === undefined) {
                    _mm.errorDialog('参数为空');
                    return;
                }
                this.$router.push(`/AskForLeaveApi/Save/${ID}`);
            },
            paramsInit() {
                let params = this.$route.params;
                if (params.ID !== undefined) {
                    let ID = params.ID;
                    this.submitSuccessJumpUrl = `/AskForLeave/PersonAskForLeaveProcess/${ID}`;
                    this.GetAskForLeaveByKey(ID).then((res) => {
                        this.model = res.model;
                        this.from = Object.assign({}, res.model, res.userInfo);// 请假单信息
                        this.dateDetailList = res.detailList;// 请假单明细
                        this.uploadFinishList = res.attachList;// 请假单附件列表
                        this.workFlowsDetailList = res.workFlowsDetailList;// 审批信息
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
