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
            <van-button type="primary" class="btn-item"  v-if="ArrowStatus.indexOf(fromStatus) !== -1" block @click="SubmitApplyHandle">确认提交</van-button>
            <van-button type="danger" class="btn-item" v-if="ArrowStatus.indexOf(fromStatus) !== -1" plain block @click="backEdit">返回修改</van-button>
            <van-button type="primary" class="btn-item" plain block @click="backList">返回列表</van-button>
        </div>
        <!--开始审批组件-->
        <ApproveStart
            :popupIsShow="ApproveStartIsShow"
            :ApproveStepsList="ApproveStepsList"
            :model="model"
            :ParamID="ParamID"
            @successOperation="JumpPageHandle"
        >
        </ApproveStart>
    </div>
</template>

<script>
import {
    mapActions
} from 'vuex';
import header from '../../components/common/header';
import MUtil from '../../util/mm';
import BizUtil from '../../util/bizUtil';
import OverTimeWorkCommon from './Common';
import ApproveStart from '../../components/biz/Approve/ApproveStart';

const _mm = new MUtil();
const _bizUtil = new BizUtil();

export default {
    data () {
        return {
            title: '加班单提交确认',
            ArrowStatus: ['61', '64', '68'], // 未提交、已拒绝、撤回
            fromStatus: '61', // 状态

            model: {},
            detailList: [],
            workFlowList: [],

            ApproveStartIsShow: false, // 开始审批
            ApproveStepsList: [], // 步骤审批用户列表
            ParamID: {},
        }
    },
    components: {
        [header.name]: header,
        [OverTimeWorkCommon.name]: OverTimeWorkCommon,
        [ApproveStart.name]: ApproveStart,
    },
    methods: {
        ...mapActions([
            'GetOverTimeWorkByKey',
            'GetWorkFlowApproveUserList',
        ]),
        SubmitApplyHandle() {
            // 获取流程审批人列表
            let data = {
                FormID: '2', // FormID=2
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
        JumpPageHandle() {
            this.$router.push(`/OverTimeWork/View/${this.model.ID}`);
        },
        backEdit() {
            this.$router.push(`/OverTimeWork/Save/${this.model.ID}`);
        },
        backList() {
            this.$router.push(`/OverTimeWorkApi/PersonOverTimeWorkList`);
        },
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
