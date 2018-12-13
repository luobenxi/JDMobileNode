<template>
    <div id="OutCompanyAdd-box">
        <jd-header :title="title" backUrl="/AskForLeaveApi/PersonAskForLeaveList"></jd-header>
        <van-cell-group>
            <van-field v-model="from.DepartName" label="部门" disabled />
            <van-field v-model="from.FullName" label="姓名" disabled />
            <van-field v-model="from.DocNumb" label="编号" disabled />
            <van-field v-model="from.PostName" label="岗位" disabled />
            <van-field v-model="from.EntrantDate" label="入职日期" disabled />
        </van-cell-group>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">请假时间</van-col>
                <van-col>
                    <van-button size="small" @click="chooseDate">选择时间</van-button>
                </van-col>
            </van-row>
        </van-cell>
        <van-cell v-if="DateDetailArr.length">
            <van-row type="flex" v-for="(item, index) in DateDetailArr" :key="item.Date" justify="space-around" class="DateArrRow">
                <van-col span="6">{{item.Date}}</van-col>
                <van-col span="6">
                    <select v-model="item.AskType" class="select-css">
                        <option v-for="itemOption in AskTypeOption" :key="itemOption.id" :value="itemOption.id">{{itemOption.text}}</option>
                    </select>
                </van-col>
                <van-col span="6">
                    <select v-model="item.AmPmType" class="select-css">
                        <option v-for="itemOption in AmPmTypeOption" :key="itemOption.id" :value="itemOption.id">{{itemOption.text}}</option>
                    </select>
                </van-col>
                <van-col class="deleteText" span="3">
                    <span @click="deleteItem(index)">删除</span>
                </van-col>
            </van-row>
        </van-cell>
        <van-cell-group>
            <van-field v-model="from.Reason" label="请假原因" type="textarea" placeholder="请输入请假原因" rows="2" autosize />
        </van-cell-group>
        <van-cell>
            <jd-upload :InitFileList="UploadFinishList" @getData="getUploadFinishList"></jd-upload>
        </van-cell>
        <div class="sub-btn" v-if="!PageLoading">
            <van-button type="primary" class="btn-item" v-if="fromStatus === '61'" block @click="SaveHandle">保 存</van-button>
            <van-button type="primary" class="btn-item" v-if="from.ID && fromStatus==='61'" plain block @click="SubmitApplyHandle">提交申请</van-button>
            <van-button type="danger" class="btn-item" v-if="from.ID && fromStatus === '61'" plain block @click="DeleteHandle">删 除</van-button>
        </div>
        <van-loading class="loading-box" v-if="PageLoading" color="#909399"/>
        <div>
            <van-popup v-model="pickerIsShow" position="bottom" :overlay="true" @click-overlay="clickOverlay">
                <JdDatetimePicker
                    @onCancel="onCancel"
                    @onConfirm="onConfirm"
                    type="date"
                >
                </JdDatetimePicker>
            </van-popup>
        </div>
        <!--开始审批组件-->
        <ApproveStart :popupIsShow="ApproveStartIsShow" :ApproveStepsList="ApproveStepsList" :model="model" :ParamID="ParamID"></ApproveStart>
    </div>
</template>

<script>
import {
    mapActions
} from 'vuex';
import header from '../../components/common/header';
import upload from '../../components/common/upload';
import JdDatetimePicker from '../../components/common/datetimePicker';
import ApproveStart from '../../components/biz/Approve/ApproveStart';
import MUtil from '../../util/mm';
import BizUtil from '../../util/bizUtil';
import { Dialog } from 'vant';

const _mm = new MUtil();
const _bizUtil = new BizUtil();

export default {
    data () {
        return {
            title: '填写请假单',
            from: {
                ID: '',
                Reason: '', // 原因
            },
            model: {}, // 存放一条记录
            fromStatus: '61',
            PageLoading: false,
            UploadFinishList: [],
            DateDetailArr: [],
            DateArr: [],

            ApproveStartIsShow: false, // 开始审批
            ApproveStepsList: [], // 步骤审批用户列表
            ParamID: {}, // 数据参数ID

            pickerIsShow: false,
            AskTypeOption: _bizUtil.GetAskTypeOption(),
            AmPmTypeOption: _bizUtil.GetAmPmTypeOption(),
        }
    },
    components: {
        [header.name]: header,
        [upload.name]: upload,
        [JdDatetimePicker.name]: JdDatetimePicker,
        [ApproveStart.name]: ApproveStart,
    },
    computed: {
    },
    methods: {
        ...mapActions([
            'SaveAskForLeave',
            'GetAskForLeaveByKey',
            'DeleteAskForLeaveByKey',
            'GetWorkFlowApproveUserList', // 获取流程审批人列表
        ]),
        getUploadFinishList(list) {
            this.UploadFinishList = list;
        },
        chooseDate() {
            this.pickerIsShow = true;
        },
        clickOverlay() {
            this.pickerIsShow = false;
        },
        onCancel() {
            this.pickerIsShow = false;
        },
        onConfirm(val) {
            let valStr = _mm.formatDate(val);
            // includes 用来判断一个数组是否包含一个指定的值，返回 true或 false
            if (!this.DateArr.includes(valStr)) {
                this.DateDetailArr.push({
                    Date: valStr,
                    AskType: 1,
                    AmPmType: 1,
                });
                this.DateArr.push(valStr);
            }
            this.pickerIsShow = false;
        },
        deleteItem(index) {
            Dialog.confirm({
                title: '提示',
                message: '你确认要删除吗？'
            }).then(() => {
                this.DateArr.splice(index, 1); // 从下标为index删除，删除一个元素
                this.DateDetailArr.splice(index, 1);
            }).catch(() => {
            });
        },
        SaveHandle() {
            if (this.DateDetailArr.length === 0) {
                _mm.errorDialog('请选择请假时间');
                return;
            }
            if (this.from.Reason === undefined) {
                _mm.errorDialog('请输入请假原因');
                return;
            }
            let DateDetailArrTemp = this.DateDetailArr.map((item) => {
                return Object.assign({}, item, {
                    AskType: parseInt(item.AskType)
                });
            });
            let subData = Object.assign({}, this.from, {
                DateDetailArr: DateDetailArrTemp,
                UploadFinishList: this.UploadFinishList
            });
            this.PageLoading = true;
            this.SaveAskForLeave(subData).then((res) => {
                this.PageLoading = false;
                if (res.success) {
                    _mm.confirmDialog(res.msg, () => {
                        this.$router.push(`/AskForLeaveApi/Save/${res.data}`);
                        this.$router.go(0); // 刷新当前页面
                    });
                } else {
                    _mm.errorDialog(res.msg);
                }
            });
        },
        getUserInfoFromUtil() {
            _bizUtil.getAllUserInfoFromApiOrLocalPromise().then((userInfo) => {
                this.from = Object.assign({}, this.from, {
                    DepartName: userInfo.user.DepartName,
                    FullName: userInfo.user.FullName,
                    DocNumb: userInfo.userFile.DocNumb,
                    PostName: userInfo.userFile.PostName,
                    EntrantDate: _mm.formatDate(userInfo.userFile.EntrantDate),
                });
            });
        },
        // 提交申请
        SubmitApplyHandle() {
            let ID = this.from.ID;
            if (!ID) {
                _mm.errorDialog('参数为空');
                return;
            }
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
        DeleteHandle() {
            let ID = this.from.ID;
            if (!ID) {
                _mm.errorDialog('参数为空');
                return;
            }
            Dialog.confirm({
                title: '提示',
                message: '你确认要删除吗？'
            }).then(() => {
                this.PageLoading = true;
                this.DeleteAskForLeaveByKey(ID).then((res) => {
                    this.PageLoading = false;
                    if (res.success) {
                        _mm.successDialog(res.msg);
                        this.$router.push(`/AskForLeaveApi/PersonAskForLeaveList`);
                    } else {
                        _mm.errorDialog(res.msg);
                    }
                });
            }).catch(() => {
            });
        },
        paramsInit() {
            let params = this.$route.params;
            if (params.ID !== undefined) {
                // Edit
                let ID = params.ID;
                this.title = '编辑请假单';
                this.PageLoading = true;
                this.GetAskForLeaveByKey(ID).then((res) => {
                    if (res.model.Status === '63') {
                        // 已通过
                        this.$router.push(`/AskForLeave/PersonAskForLeaveView/${ID}`);
                        return false;
                    }
                    this.from = Object.assign({}, res.model, res.userInfo, {
                        EntrantDate: _mm.formatDate(res.userInfo.EntrantDate),
                        Reason: res.model.Reson,
                        ID: res.model.ID, // ID赋值
                    });
                    this.model = res.model; // model赋值一条记录
                    this.PageLoading = false;
                    this.fromStatus = res.model.Status; // 状态
                    // 请假单明细
                    res.detailList.map((item) => {
                        this.DateDetailArr.push({
                            Date: _mm.formatStrDate(item.TheDay),
                            AskType: parseInt(item.AskForLeaveTypeID),
                            AmPmType: parseInt(item.AMPM)
                        });
                    });
                    // 请假单附件列表
                    res.attachList.map((item) => {
                        this.UploadFinishList.push({
                            SavePath: item.FilePath,
                            name: item.FileName
                        });
                    });
                });
            } else {
                //Add
                this.title = '填写请假单';
            }
        },
    },
    mounted() {
        this.getUserInfoFromUtil();
        this.paramsInit();
    }
}
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
    @import "../../style/pages/OutCompany/Add";
</style>
