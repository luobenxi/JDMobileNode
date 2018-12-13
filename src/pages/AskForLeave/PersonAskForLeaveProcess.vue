<template>
    <div>
        <jd-header title="我的请假单"></jd-header>
        <PersonAskForLeaveCommon
                :from="from"
                :dateDetailList="dateDetailList"
                :uploadFinishList="uploadFinishList"
                :workFlowsDetailList="workFlowsDetailList"
        >
        </PersonAskForLeaveCommon>
        <div class="sub-btn">
            <van-button type="danger" class="btn-item" v-if="fromStatus==='62'" block @click="WithDrawHandle">撤 回</van-button>
            <van-button type="primary" class="btn-item" v-if="fromStatus==='62'" plain block @click="GoBack">返 回</van-button>
        </div>
        <!--开始审批组件-->
        <ApproveWithDraw :popupIsShow="ApproveWithDrawIsShow" :model="model" :ParamID="ParamID"></ApproveWithDraw>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    import header from '../../components/common/header';
    import PersonAskForLeaveCommon from './PersonAskForLeaveCommon';
    import ApproveWithDraw from '../../components/biz/Approve/ApproveWithDraw';
    import MUtil from '../../util/mm';
    import BizUtil from '../../util/bizUtil';

    const _mm = new MUtil();
    const _bizUtil = new BizUtil();

    export default {
        data () {
            return {
                ID: '', // ID
                fromStatus: '62',
                ApproveWithDrawIsShow: false, // 审批撤回
                ParamID: {}, // 数据参数ID
                model: {}, // 存放一条记录

                from: {},
                dateDetailList: [],
                uploadFinishList: [],
                workFlowsDetailList: [],
            }
        },
        components: {
            [header.name]: header,
            [ApproveWithDraw.name]: ApproveWithDraw,
            [PersonAskForLeaveCommon.name]: PersonAskForLeaveCommon,
        },
        computed: {
        },
        methods: {
            ...mapActions([
                'GetAskForLeaveByKey',
            ]),
            WithDrawHandle() {
                this.ApproveWithDrawIsShow = !this.ApproveWithDrawIsShow;
            },
            GoBack() {
                this.$router.push(`/AskForLeaveApi/PersonAskForLeaveList`);
            },
            paramsInit() {
                let params = this.$route.params;
                if (params.ID !== undefined) {
                    let ID = params.ID;
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
