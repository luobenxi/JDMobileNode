<template>
    <div>
        <jd-header :title="title" backUrl="/AskForLeaveApi/PersonAskForLeaveList"></jd-header>
        <PersonAskForLeaveCommon
                :from="from"
                :dateDetailList="dateDetailList"
                :uploadFinishList="uploadFinishList"
                :workFlowsDetailList="workFlowsDetailList"
        >
        </PersonAskForLeaveCommon>
        <div class="sub-btn" v-if="ArrowStatus.indexOf(fromStatus) !== -1">
            <van-button type="danger" class="btn-item" block @click="ApproveCancelHandle">销假申请</van-button>
        </div>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    import header from '../../components/common/header';
    import PersonAskForLeaveCommon from './PersonAskForLeaveCommon';
    import MUtil from '../../util/mm';
    import BizUtil from '../../util/bizUtil';
    import { Dialog } from 'vant';

    const _mm = new MUtil();
    const _bizUtil = new BizUtil();

    export default {
        data () {
            return {
                title: '请假单详情',
                ID: '',
                from: {
                    ID: '',
                    Reason: '', // 原因
                },
                wfDetailId: '', // 流程详情ID
                model: {}, // 存放一条记录
                ArrowStatus: ['63'], // 已通过
                fromStatus: '63',
                uploadFinishList: [],
                dateDetailList: [],
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
            [PersonAskForLeaveCommon.name]: PersonAskForLeaveCommon,
        },
        computed: {
        },
        methods: {
            ...mapActions([
                'GetAskForLeaveByKey',
                'GetAskForLeaveCancelByAskForLeaveID',
            ]),
            ApproveCancelHandle() {
                if (!this.ID) {
                    _mm.errorDialog('参数为空，请联系管理员');
                    return;
                }
                this.GetAskForLeaveCancelByAskForLeaveID(this.ID).then((res) => {
                    if (res.success) {
                        // 如果已经写入了销假单，直接跳转页面
                        this.$router.push(`/AskForLeave/AskForLeaveCancelEdit/${this.ID}`);
                    } else {
                        // 如果没有写入销假单，给个确认提示，用户确认后才跳转，用户取消不跳转
                        _mm.confirmDialog('你确定要销假吗？', () => {
                            this.$router.push(`/AskForLeave/AskForLeaveCancelEdit/${this.ID}`);
                        }, true);
                    }
                });
            },
            paramsInit() {
                let params = this.$route.params;
                if (params.ID !== undefined) {
                    // Edit
                    let ID = params.ID;
                    this.ID = params.ID;
                    this.GetAskForLeaveByKey(ID).then((res) => {
                        this.model = res.model;
                        this.from = Object.assign({}, res.model, res.userInfo);// 请假单信息
                        this.dateDetailList = res.detailList;// 请假单明细
                        this.uploadFinishList = res.attachList;// 请假单附件列表
                        this.workFlowsDetailList = res.workFlowsDetailList;// 审批信息
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
