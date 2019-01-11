<template>
    <div>
        <jd-header :title="title"></jd-header>
        <OverTimeWorkCommon
            :model="model"
            :detailList="detailList"
            :workFlowList="workFlowList"
        >
        </OverTimeWorkCommon>
        <div class="sub-btn">
            <!--Status=62=审批中 才显示撤回按钮，加班单没有撤回-->
            <!--<van-button type="danger" class="btn-item" block @click="WithDrawHandle">撤 回</van-button>-->
            <van-button type="primary" class="btn-item" plain block @click="backList">返回列表</van-button>
        </div>
        <!--撤回组件-->
        <!--<ApproveWithDraw :popupIsShow="ApproveWithDrawIsShow" :ParamID="ParamID" @successOperation="JumpPageHandle"></ApproveWithDraw>-->
    </div>
</template>

<script>
import {
    mapActions
} from 'vuex';
import header from '../../components/common/header';
import OverTimeWorkCommon from './Common';
// import ApproveWithDraw from '../../components/biz/Approve/ApproveWithDraw';
import MUtil from '../../util/mm';
import BizUtil from '../../util/bizUtil';

const _mm = new MUtil();
const _bizUtil = new BizUtil();

export default {
    data () {
        return {
            title: '加班单详情',
            fromStatus: '',
            // fromStatus==='62' ||
            model: {},
            detailList: [],
            workFlowList: [],
            ParamID: {},
            ApproveWithDrawIsShow: false, // 审批撤回
        }
    },
    components: {
        [header.name]: header,
        [OverTimeWorkCommon.name]: OverTimeWorkCommon,
        // [ApproveWithDraw.name]: ApproveWithDraw,
    },
    methods: {
        ...mapActions([
            'GetOverTimeWorkByKey',
            'GetWorkFlowApproveUserList',
        ]),
        backList() {
            this.$router.push(`/OverTimeWorkApi/PersonOverTimeWorkList`);
        },
        JumpPageHandle() {
            this.paramsInit();
        },
        // WithDrawHandle() {
        //     this.ParamID = {
        //         ID: this.model.ID
        //     };
        //     this.ApproveWithDrawIsShow = !this.ApproveWithDrawIsShow;
        // },
        DataInit(ID) {
            this.GetOverTimeWorkByKey(ID).then((res) => {
                this.model = Object.assign({}, res.model, res.userInfo);
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
