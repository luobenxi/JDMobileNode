<template>
    <div id="OutCompanyAdd-box">
        <jd-header :title="title" backUrl="/OverTimeWorkApi/PersonOverTimeWorkList"></jd-header>
        <van-cell-group>
            <van-field v-model="from.FullName" disabled label="姓名" />
            <van-field v-model="from.DepartName" disabled label="部门" />
            <van-field v-model="from.DocNumb" disabled label="编号" />
            <van-field v-model="from.PostName" disabled label="岗位" />
            <van-field v-model="from.Reason" label="加班事由" type="textarea" placeholder="请输入加班事由" rows="2" autosize />
            <van-field v-model="from.WorkDetails" label="工作内容" type="textarea" placeholder="请输入工作内容" rows="2" autosize />
            <van-field v-model="from.WorkPlace" placeholder="请输入工作地点" label="工作地点" />
        </van-cell-group>
        <van-cell v-if="from.ID">
            <van-row gutter="10">
                <van-col :span="6">状态</van-col>
                <van-col>
                    <JdStatusTextMap :Status="from.Status"></JdStatusTextMap>
                </van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">加班时间</van-col>
                <van-col>
                    <van-button size="small" @click="chooseDate">选择时间</van-button>
                </van-col>
            </van-row>
        </van-cell>
        <van-cell v-if="DateDetailArr.length">
            <van-row type="flex" v-for="(item, index) in DateDetailArr" :key="index" justify="space-around" class="DateArrRow">
                <van-col span="7">{{item.Date}}</van-col>
                <van-col span="4">
                    <span class="operationText" @click="detailItem(item, index)">详情</span>
                </van-col>
                <van-col span="4">
                    <span class="deleteText" @click="deleteItem(index)">删除</span>
                </van-col>
            </van-row>
        </van-cell>
        <div class="sub-btn">
            <van-button type="primary" class="btn-item" block @click="SaveHandle">保 存</van-button>
            <van-button type="primary" class="btn-item" v-if="from.ID" plain block @click="SubmitApplyHandle">提交申请</van-button>
            <van-button type="danger" class="btn-item" v-if="from.ID" plain block @click="DeleteHandle">删 除</van-button>
        </div>
        <div>
            <van-popup v-model="pickerIsShow" position="bottom" :overlay="true">
                <JdDatetimePicker
                    @onCancel="onCancel"
                    @onConfirm="onConfirm"
                    type="date"
                >
                </JdDatetimePicker>
                <van-cell></van-cell>
                <van-cell>
                    <van-row gutter="10">
                        <van-col :span="6">加班类型</van-col>
                        <van-col>
                            <van-radio-group v-model="WorkOverTimeTypeID">
                                <van-radio v-for="(item, index) in OverTimeWorkTypeList" :key="index" :name="item.id">{{item.text}}</van-radio>
                            </van-radio-group>
                        </van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row gutter="10">
                        <van-col :span="6">公司内/外</van-col>
                        <van-col>
                            <van-radio-group v-model="OutOrIn">
                                <van-radio v-for="(item, index) in OutOrInOption" :key="index" :name="item.id">{{item.text}}</van-radio>
                            </van-radio-group>
                        </van-col>
                    </van-row>
                </van-cell>
                <van-cell style="margin-bottom: 10px">
                    <van-row gutter="10">
                        <van-col :span="6">工时数</van-col>
                        <van-col v-if="OutOrIn === '1'">
                            以打卡时间为准
                        </van-col>
                        <van-col v-if="OutOrIn === '0'">
                            <input type="text" class="OutOrIn-input" v-if="OutOrIn === '0'" v-model="Hours" placeholder="输入工时数" />
                        </van-col>
                    </van-row>
                </van-cell>
            </van-popup>
        </div>
        <JdPopup :popupIsShow="itemDetailPopupIsShow" @onConfirm="itemDetailOnConfirm">
            <van-cell>
                <van-row>
                    <van-col span="8">日期</van-col>
                    <van-col>{{itemDetail.Date}}</van-col>
                    <van-col class="edit-btn-box">
                        <span class="operationText" @click="editItemDate">修改</span>
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col span="8">加班类型</van-col>
                    <van-col>
                        <van-radio-group v-model="itemDetail.WorkOverTimeTypeID">
                            <van-radio v-for="(item, index) in OverTimeWorkTypeList" :key="index" :name="item.id">{{item.text}}</van-radio>
                        </van-radio-group>
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col span="8">公司内/外</van-col>
                    <van-col>
                        <van-radio-group v-model="itemDetail.OutOrIn">
                            <van-radio v-for="(item, index) in OutOrInOption" :key="index" :name="item.id">{{item.text}}</van-radio>
                        </van-radio-group>
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col span="8">加班开始时间</van-col>
                    <van-col>{{itemDetail.StartTimeOnly}}</van-col>
                    <van-col class="edit-btn-box">
                        <span class="operationText" @click="editItemStartTime">修改</span>
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col span="8">加班结束时间</van-col>
                    <van-col>{{itemDetail.EndTimeOnly}}</van-col>
                    <van-col class="edit-btn-box">
                        <span class="operationText" @click="editItemEndTime">修改</span>
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col span="8">工时数</van-col>
                    <van-col v-if="itemDetail.OutOrIn === '1'">以打卡时间为准</van-col>
                    <van-col v-if="itemDetail.OutOrIn === '0'">
                        <input type="text" class="OutOrIn-input" v-if="itemDetail.OutOrIn === '0'" v-model="itemDetail.Hours" placeholder="输入工时数" />
                    </van-col>
                </van-row>
            </van-cell>
        </JdPopup>
        <!--每一项的日期修改-->
        <JdDatetimePickerPopup :popupIsShow="itemDetailDatePopupIsShow" type="date" :defaultDate="itemDetail.Date" @onConfirm="onConfirmItemDate">
        </JdDatetimePickerPopup>
        <!--每一项的开始时间修改-->
        <van-popup v-model="itemDetailStartTimePopupIsShow" position="bottom" :overlay="true">
            <van-datetime-picker v-model="itemDetail.StartTimeOnly" type="time" @cancel="onCancelItemStartTime" @confirm="onConfirmItemStartTime" />
        </van-popup>
        <!--每一项的结束时间修改-->
        <van-popup v-model="itemDetailEndTimePopupIsShow" position="bottom" :overlay="true">
            <van-datetime-picker v-model="itemDetail.EndTimeOnly" type="time" @cancel="onCancelItemEndTime" @confirm="onConfirmItemEndTime" />
        </van-popup>
    </div>
</template>

<script>
import {
    mapActions, mapGetters
} from 'vuex';
import header from '../../components/common/header';
import popup from '../../components/common/popup';
import JdDatetimePicker from '../../components/common/datetimePicker';
import datetimePickerPopup from '../../components/common/datetimePickerPopup';
import MUtil from '../../util/mm';
import BizUtil from '../../util/bizUtil';
import statusTextMap from '../../components/common/statusTextMap';
import { Dialog } from 'vant';

const _mm = new MUtil();
const _bizUtil = new BizUtil();

export default {
    data () {
        return {
            title: '填写加班单',
            from: {
                ID: '',
                Reason: '', // 申请加班事由
                WorkDetails: '', // 工作内容
                WorkPlace: '', // 工作地点
                Remark: '',
            },
            WorkOverTimeTypeID: '1', // 类型
            OutOrIn: '1',
            OutOrInOption: _bizUtil.getOutOrInOption(),
            Hours: 8,
            DateDetailArr: [],
            DateArr: [],
            pickerIsShow: false,

            itemDetailPopupIsShow: false,
            itemDetail: {}, // Item
            indexDetail: 0, // 索引

            itemDetailDatePopupIsShow: false,
            itemDetailStartTimePopupIsShow: false,
            itemDetailEndTimePopupIsShow: false,
        }
    },
    components: {
        [header.name]: header,
        [popup.name]: popup,
        [statusTextMap.name]: statusTextMap,
        [JdDatetimePicker.name]: JdDatetimePicker,
        [datetimePickerPopup.name]: datetimePickerPopup,
    },
    computed: {
        ...mapGetters([
            'OverTimeWorkTypeList',
            'UserInfo',
        ]),
        // 未使用
        getHours() {
            let date1 = new Date(this.itemDetail.StartTime);
            let date2 = new Date(this.itemDetail.EndTime);
            let date3 = date2.getTime() - date1.getTime();   //时间差的毫秒数
            //计算出小时数
            let leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
            return Math.floor(leave1 / (3600 * 1000));
        },
    },
    methods: {
        ...mapActions([
            'GetOverTimeWorkTypeList',
            'GetOverTimeWorkByKey',
            'SaveOverTimeWork',
            'DeleteOverTimeWorkByKey',
        ]),
        // 选择日期
        chooseDate() {
            this.pickerIsShow = !this.pickerIsShow;
        },
        // 选择日期取消
        onCancel() {
            this.pickerIsShow = false;
        },
        // 选择日期确认
        onConfirm(val) {
            let valStr = _mm.formatDate(val);
            if (!this.DateArr.includes(valStr)) {
                this.DateDetailArr.push({
                    Date: valStr,
                    WorkOverTimeTypeID: this.WorkOverTimeTypeID,
                    StartTime: valStr + ' 8:30:00',
                    StartTimeOnly: '8:30:00',
                    EndTime: valStr + ' 17:30:00',
                    EndTimeOnly: '17:30:00',
                    Hours: this.OutOrIn === '1' ? '' : this.Hours,
                    OutOrIn: this.OutOrIn,
                });
                this.DateArr.push(valStr);
            }
            this.pickerIsShow = false;
        },

        // 每一项日期修改
        editItemDate() {
            this.itemDetailDatePopupIsShow = !this.itemDetailDatePopupIsShow;
        },
        // 每一项日期确认
        onConfirmItemDate(val) {
            this.itemDetail = Object.assign({}, this.itemDetail, {
                Date: _mm.formatDate(val),
                StartTime: _mm.formatDate(val) + ' ' + this.itemDetail.StartTimeOnly,
                EndTime: _mm.formatDate(val) + ' ' + this.itemDetail.EndTimeOnly,
            });
            this.DateDetailArr[this.indexDetail] = this.itemDetail; // 赋值
            this.DateArr[this.indexDetail] = this.itemDetail.Date;
        },

        // 每一项开始时间修改
        editItemStartTime() {
            this.itemDetailStartTimePopupIsShow = true;
        },
        // 开始时间取消
        onCancelItemStartTime() {
            this.itemDetailStartTimePopupIsShow = false;
        },
        // 开始时间确认
        onConfirmItemStartTime(val) {
            this.itemDetail = Object.assign({}, this.itemDetail, {
                StartTime: this.itemDetail.Date + ' ' + val + ':00',
            });
            this.DateDetailArr[this.indexDetail] = this.itemDetail; // 赋值
            this.DateArr[this.indexDetail] = this.itemDetail.Date;
            this.itemDetailStartTimePopupIsShow = false;
        },

        // 每一项结束时间修改
        editItemEndTime() {
            this.itemDetailEndTimePopupIsShow = true;
        },
        // 结束时间取消
        onCancelItemEndTime() {
            this.itemDetailEndTimePopupIsShow = false;
        },
        // 结束时间确认
        onConfirmItemEndTime(val) {
            this.itemDetail = Object.assign({}, this.itemDetail, {
                EndTime: this.itemDetail.Date + ' ' + val + ':00',
            });
            this.DateDetailArr[this.indexDetail] = this.itemDetail; // 赋值
            this.DateArr[this.indexDetail] = this.itemDetail.Date;
            this.itemDetailEndTimePopupIsShow = false;
        },
        // 每一项确认
        itemDetailOnConfirm() {
            this.DateDetailArr.splice(this.indexDetail, 1);
            this.DateDetailArr.push(this.itemDetail);
        },
        // 详情
        detailItem(item, index) {
            this.indexDetail = index;
            this.itemDetail = Object.assign({}, item, {
                StartTimeOnly: _mm.formatTimeOnly(item.StartTime),
                EndTimeOnly: _mm.formatTimeOnly(item.EndTime),
            });
            this.itemDetailPopupIsShow = !this.itemDetailPopupIsShow;
        },
        // 删除每一项
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
        // 保存
        SaveHandle() {
            if (this.from.Reason === '' || this.from.Reason === undefined) {
                _mm.errorDialog('请输入申请加班事由');
                return;
            }
            if (this.from.WorkDetails === '' || this.from.WorkDetails === undefined) {
                _mm.errorDialog('请输入工作内容');
                return;
            }
            if (this.from.WorkPlace === '' || this.from.WorkPlace === undefined) {
                _mm.errorDialog('请输入工作地点');
                return;
            }
            if (this.DateDetailArr.length === 0) {
                _mm.errorDialog('请选择加班时间');
                return;
            }
            let subData = Object.assign({}, this.from, {
                DetailArr: this.DateDetailArr
            });
            this.SaveOverTimeWork(subData).then((res) => {
                if (res.success) {
                    _mm.confirmDialog(res.msg, () => {
                        this.$router.push(`/OverTimeWork/Save/${res.data}`);
                        this.paramsInit();
                    });
                } else {
                    _mm.errorDialog(res.msg);
                }
            });
        },
        // 提交申请
        SubmitApplyHandle() {
            let ID = this.from.ID;
            if (!ID) {
                _mm.errorDialog('参数为空');
                return;
            }
            this.$router.push(`/OverTimeWork/SubmitConfirm/${ID}`);
        },
        // 删除数据
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
                this.DeleteOverTimeWorkByKey(ID).then((res) => {
                    if (res.success) {
                        _mm.successDialog(res.msg);
                        this.$router.push(`/OverTimeWorkApi/PersonOverTimeWorkList`);
                    } else {
                        _mm.errorDialog(res.msg);
                    }
                });
            }).catch(() => {
            });
        },
        getUserInfoFromUtil() {
            _bizUtil.getAllUserInfoFromApiOrLocalPromise().then((userInfo) => {
                this.from = Object.assign({}, {
                    DepartName: userInfo.user.DepartName,
                    FullName: userInfo.user.FullName,
                    DocNumb: userInfo.userFile.DocNumb,
                    PostName: userInfo.userFile.PostName,
                });
            });
        },
        DataInit(ID) {
            this.GetOverTimeWorkByKey(ID).then((res) => {
                this.from = Object.assign({}, res.model, res.userInfo, {
                    ID: res.model.ID,
                    Reason: res.model.Reson,
                });
                this.DateArr = []; // 编辑时候数据化data属性数据
                this.DateDetailArr = [];
                res.detailList.map((item) => {
                    this.DateArr.push(_mm.formatStrDate(item.TheDay));
                    this.DateDetailArr.push({
                        Date: _mm.formatStrDate(item.TheDay),
                        WorkOverTimeTypeID: item.WorkOverTimeTypeID,
                        StartTime: item.StartTime,
                        StartTimeOnly: _mm.formatTimeOnly(item.StartTime),
                        EndTime: item.EndTime,
                        EndTimeOnly: _mm.formatTimeOnly(item.EndTime),
                        Hours: item.Hours,
                        OutOrIn: item.OutOrIn === 'True' ? '1' : '0',
                    });
                });
            });
        },
        paramsInit() {
            let params = this.$route.params;
            if (params.ID !== undefined) {
                //Edit
                this.title = '编辑加班单';
                this.DataInit(params.ID);
            } else {
                //Add
                this.getUserInfoFromUtil();
            }
        }
    },
    mounted() {
        if (!this.OverTimeWorkTypeList.length) {
            this.GetOverTimeWorkTypeList();
        }
        this.paramsInit();
    }
}
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
    @import "../../style/pages/OutCompany/Add";
    .edit-btn-box {
        margin-left: 20px;
    }
    .OutOrIn-input {
        border: solid 1px #E4E7ED;
        padding: 1px 5px;
        font-size: 12px;
    }
</style>
