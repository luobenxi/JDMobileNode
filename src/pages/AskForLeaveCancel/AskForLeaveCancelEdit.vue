<template>
    <div id="OutCompanyAdd-box">
        <jd-header :title="title"></jd-header>
        <van-cell-group>
            <van-field v-model="from.DepartName" label="部门" disabled />
            <van-field v-model="from.FullName" label="姓名" disabled />
            <van-field v-model="from.DocNumb" label="编号" disabled />
            <van-field v-model="from.PostName" label="岗位" disabled />
            <van-field v-model="from.EntrantDate" label="入职日期" disabled />
            <van-field v-model="from.Reason" label="请假原因" type="textarea" placeholder="请输入请假原因" rows="2" autosize disabled />
            <van-field v-model="from.AskInsertTime" label="提交时间" disabled />
            <van-field v-model="from.CancelReason" label="销假原因" type="textarea" placeholder="请输入销假原因..." rows="2" autosize />
        </van-cell-group>
        <van-cell>
            <van-row>
                <van-col span="24">请假日期</van-col>
            </van-row>
        </van-cell>
        <van-cell v-if="DateDetailArr.length">
            <van-row type="flex" v-for="(item, index) in DateDetailArr" :key="index" justify="space-around" class="DateArrRow">
                <van-col span="6" class="lineThrough" v-if="item.IsAble === 0">{{item.Date}}</van-col>
                <van-col span="6" class="" v-if="item.IsAble === 1">{{item.Date}}</van-col>
                <van-col span="6">
                    <select v-model="item.AskType" class="select-css" disabled>
                        <option v-for="itemOption in AskForLeaveTypeList" :key="itemOption.id" :value="itemOption.id">{{itemOption.text}}</option>
                    </select>
                </van-col>
                <van-col span="6">
                    <select v-model="item.AmPmType" class="select-css">
                        <option v-for="itemOption in AmPmTypeOption" :key="itemOption.id" :value="itemOption.id">{{itemOption.text}}</option>
                    </select>
                </van-col>
                <van-col span="3">
                    <span class="deleteText" v-if="item.IsAble === 1" @click="CancelItem(item, index, 0)">销假</span>
                    <span class="operationText" v-if="item.IsAble === 0" @click="CancelItem(item, index, 1)">恢复</span>
                </van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <jd-upload :InitFileList="UploadFinishList" @getData="getUploadFinishList"></jd-upload>
        </van-cell>
        <div class="sub-btn">
            <van-button type="primary" class="btn-item" v-if="ArrowStatusCanOperation.indexOf(fromStatus) !== -1" block @click="SaveHandle">保 存</van-button>
            <van-button type="primary" class="btn-item" v-if="from.ID && ArrowStatusCanOperation.indexOf(fromStatus) !== -1" plain block @click="SubmitApplyHandle">提交销假申请</van-button>
        </div>
        <!--开始审批组件-->
        <ApproveStart
            :popupIsShow="ApproveStartIsShow"
            :ApproveStepsList="ApproveStepsList":model="model"
            :ParamID="ParamID"
            @successOperation="JumpPageHandle"
        >
        </ApproveStart>
    </div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
import header from '../../components/common/header';
import upload from '../../components/common/upload';
import JdDatetimePickerPopup from '../../components/common/datetimePickerPopup';
import ApproveStart from '../../components/biz/Approve/ApproveStart';
import MUtil from '../../util/mm';
import BizUtil from '../../util/bizUtil';
import { Dialog } from 'vant';

const _mm = new MUtil();
const _bizUtil = new BizUtil();

export default {
    data () {
        return {
            title: '销假申请单',
            from: {
                ID: '',
                AskInsertTime: '', // AskInsertTime
                Reason: '', // 原因
                CancelReason: '', // 销假原因
            },

            ApproveStepsList: [], // 审批人
            ApproveStartIsShow: false, // 开始审批
            model: {},
            ParamID: {},

            ArrowStatusCanOperation: ['61', '64', '65', '68'],
            ArrowStatus: ['62', '63'], // 审批中、已通过
            fromStatus: '61',
            UploadFinishList: [],
            DateDetailArr: [],
            DateArr: [],
            AmPmTypeOption: _bizUtil.GetAmPmTypeOption(),
        }
    },
    components: {
        [header.name]: header,
        [upload.name]: upload,
        [ApproveStart.name]: ApproveStart,
        [JdDatetimePickerPopup.name]: JdDatetimePickerPopup,
    },
    computed: {
        ...mapGetters([
            'AskForLeaveTypeList',
        ])
    },
    methods: {
        ...mapActions([
            'GetWorkFlowApproveUserList',
            'GetAskForLeaveTypeList',
            'AskForLeaveCancelSave', // 添加并返回新添加的信息和其他信息
            'AskForLeaveCancelSavePost',
        ]),
        getUploadFinishList(list) {
            this.UploadFinishList = list;
        },
        CancelItem(item, index, IsAble) {
            if (IsAble === 0) {
                Dialog.confirm({
                    title: '提示',
                    message: `你确认要销假吗？`
                }).then(() => {
                    this.DateDetailArr[index].IsAble = IsAble;
                }).catch(err => {
                    console.log(err);
                });
            } else {
                this.DateDetailArr[index].IsAble = IsAble;
            }
        },
        SaveHandle() {
            if (this.DateDetailArr.length === 0) {
                _mm.errorDialog('请假时间为空');
                return;
            }
            if (this.from.CancelReason === undefined || !this.from.CancelReason) {
                _mm.errorDialog('请输入销假原因');
                return;
            }
            let DateDetailArrTemp = this.DateDetailArr.map((item) => {
                return Object.assign({}, item, {
                    AskType: parseInt(item.AskType)
                });
            });
            let subData = Object.assign({}, {
                ID: this.from.ID,
                Reason: this.from.CancelReason,
                DateDetailArr: DateDetailArrTemp,
                UploadFinishList: this.UploadFinishList
            });
            this.AskForLeaveCancelSavePost(subData).then((res) => {
                if (res.success) {
                    _mm.confirmDialog(res.msg, () => {
                        this.paramsInit();
                    });
                } else {
                    _mm.errorDialog(res.msg);
                }
            });
        },
        SubmitApplyHandle() {
            let ID = this.from.ID;
            if (!ID) {
                _mm.errorDialog('参数为空');
                return;
            }
            if (this.from.CancelReason === undefined || !this.from.CancelReason) {
                _mm.errorDialog('请输入销假原因并保存再提交申请');
                return;
            }
            // 获取流程审批人列表
            let data = {
                FormID: '8', // FormID = 8
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
            _mm.confirmDialog('提交前确认已点击保存按钮？', () => {
                this.GetWorkFlowApproveUserList(data).then(res => {
                    this.ApproveStepsList = res.UserList; // 审批人数据赋值
                    this.ParamID = res.ParamID; // 参数赋值
                    this.ApproveStartIsShow = !this.ApproveStartIsShow; // 显示弹出层
                });
            }, true);
        },
        JumpPageHandle() {
            let ID = this.from.ID;
            if (!ID) {
                _mm.errorDialog('参数为空');
                return;
            }
            this.$router.push(`/AskForLeave/AskForLeaveCancelApprovalView/${ID}`); // 提交完成跳转到详情页
        },
        paramsInit() {
            let params = this.$route.params;
            if (params.ID !== undefined) {
                // Edit
                let ID = params.ID;
                this.title = '销假申请单';
                this.AskForLeaveCancelSave(ID).then((res) => {
                    if (this.ArrowStatus.indexOf(res.model.Status) !== -1) {
                        // !==未提交，跳转到详情页面，ID为销假单ID
                        // 参数：销假单ID
                        this.$router.push(`/AskForLeave/AskForLeaveCancelApprovalView/${res.model.ID}`);
                    }
                    this.model = res.model;
                    this.from = Object.assign({}, res.model, res.userInfo, {
                        EntrantDate: _mm.formatDate(res.userInfo.EntrantDate),
                        AskInsertTime: res.askModel.InsertTime,
                        Reason: res.askModel.Reson,
                        CancelReason: res.model.Reson, // 销假原因赋值
                    });
                    this.fromStatus = res.model.Status; // 状态
                    // 请假单明细
                    this.DateDetailArr = [];
                    res.detailList.map((item) => {
                        this.DateDetailArr.push({
                            ID: item.ID,
                            IsAble: item.IsAble === 'True' ? 1 : 0,
                            Date: _mm.formatStrDate(item.TheDay),
                            AskType: parseInt(item.AskForLeaveTypeID),
                            AmPmType: parseInt(item.AMPM)
                        });
                    });
                    // 请假单附件列表
                    this.UploadFinishList = [];
                    res.attachList.map((item) => {
                        this.UploadFinishList.push({
                            SavePath: item.FilePath,
                            name: item.FileName
                        });
                    });
                });
            }
        },
    },
    mounted() {
        if (!this.AskForLeaveTypeList.length) {
            this.GetAskForLeaveTypeList();
        }
        this.paramsInit();
    }
}
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
    @import "../../style/pages/OutCompany/Add";
</style>
