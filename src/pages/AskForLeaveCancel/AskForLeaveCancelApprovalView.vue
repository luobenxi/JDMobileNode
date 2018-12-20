<template>
    <div>
        <jd-header :title="title" backUrl="/AskForLeaveApi/PersonAskForLeaveList"></jd-header>
        <AskForLeaveCancelApprovalCommon
            :from="from"
            :dateDetailList="dateDetailList"
            :uploadFinishList="uploadFinishList"
            :workFlowsDetailList="workFlowsDetailList"
        >
        </AskForLeaveCancelApprovalCommon>
        <div class="sub-btn">
            <!--<van-button type="primary" class="btn-item" v-if="ArrowStatus.indexOf(fromStatus) !== -1" plain block @click="backEdit">返回修改</van-button>-->
            <van-button type="primary" class="btn-item" plain block @click="GoBack">返 回</van-button>
        </div>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    import header from '../../components/common/header';
    import AskForLeaveCancelApprovalCommon from './AskForLeaveCancelApprovalCommon';
    import MUtil from '../../util/mm';
    import BizUtil from '../../util/bizUtil';

    const _mm = new MUtil();
    const _bizUtil = new BizUtil();

    export default {
        data () {
            return {
                title: '我的销假申请单',
                ID: '',
                AskID: '',
                from: {
                    ID: '',
                    Reason: '', // 原因
                },
                model: {}, // 存放一条记录
                ParamID: {}, // 数据参数ID

                ArrowStatus: ['61', '64', '65', '68'], // 未提交、已拒绝、退回、撤回
                fromStatus: '61',

                uploadFinishList: [],
                dateDetailList: [],
                workFlowsDetailList: [],
            }
        },
        components: {
            [header.name]: header,
            [AskForLeaveCancelApprovalCommon.name]: AskForLeaveCancelApprovalCommon,
        },
        computed: {
        },
        methods: {
            ...mapActions([
                'GetAskForLeaveCancelByKey',
            ]),
            backEdit() {
                let ID = this.AskID;
                if (ID === undefined) {
                    _mm.errorDialog('参数为空');
                    return;
                }
                this.$router.push(`/AskForLeave/AskForLeaveCancelEdit/${ID}`);
            },
            JumpPageHandle() {
                this.paramsInit();
            },
            GoBack() {
                this.$router.push(`/AskForLeaveApi/PersonAskForLeaveList`);
            },
            paramsInit() {
                let params = this.$route.params;
                if (params.ID !== undefined) {
                    // Edit
                    let ID = params.ID;
                    this.ID = params.ID;
                    this.AskID = params.AskID;
                    this.GetAskForLeaveCancelByKey(ID).then((res) => {
                        this.from = res.row;
                        this.fromStatus = res.row.Status; // 状态
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
