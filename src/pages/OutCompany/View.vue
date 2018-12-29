<template>
    <div>
        <jd-header :title="title"></jd-header>
        <OutCompanyCommon
            :model="model"
            :detailList="detailList"
            :workFlowList="workFlowList"
        >
        </OutCompanyCommon>
        <div class="sub-btn">
            <!--Status=62=审批中 才显示撤回按钮-->
            <van-button type="danger" class="btn-item" v-if="fromStatus==='62'" block @click="WithDrawHandle">撤 回</van-button>
            <van-button type="primary" class="btn-item" plain block @click="backList">返回列表</van-button>
        </div>
        <!--撤回组件-->
        <ApproveWithDraw :popupIsShow="ApproveWithDrawIsShow" :ParamID="ParamID" @successOperation="JumpPageHandle"></ApproveWithDraw>
    </div>
</template>

<script>
import {
    mapActions
} from 'vuex';
import header from '../../components/common/header';
import OutCompanyCommon from './Common';
import ApproveWithDraw from '../../components/biz/Approve/ApproveWithDraw';
import MUtil from '../../util/mm';
import BizUtil from '../../util/bizUtil';

const _mm = new MUtil();
const _bizUtil = new BizUtil();

export default {
    data () {
        return {
            title: '公出备案单详情',
            fromStatus: '',
            model: {},
            detailList: [],
            workFlowList: [],
            ParamID: {},
            ApproveWithDrawIsShow: false, // 审批撤回
        }
    },
    components: {
        [header.name]: header,
        [OutCompanyCommon.name]: OutCompanyCommon,
        [ApproveWithDraw.name]: ApproveWithDraw,
    },
    methods: {
        ...mapActions([
            'GetOutCompanyByKey',
            'GetWorkFlowApproveUserList',
        ]),
        backList() {
            this.$router.push(`/OutCompanyApi/OutCompanyList`);
        },
        JumpPageHandle() {
            this.paramsInit();
        },
        WithDrawHandle() {
            this.ParamID = {
                ID: this.model.ID
            };
            this.ApproveWithDrawIsShow = !this.ApproveWithDrawIsShow;
        },
        DataInit(ID) {
            this.GetOutCompanyByKey(ID).then((res) => {
                this.model = Object.assign({}, res.model);
                this.detailList = res.detailList;
                this.workFlowList = res.workFlowList;
                this.fromStatus = res.model.Status;
            });
        },
        paramsInit() {
            let params = this.$route.params;
            if (params.ID !== undefined) {
                this.DataInit(params.ID);
            }
        }
    },
    mounted() {
        this.paramsInit();
    }
}
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
</style>
