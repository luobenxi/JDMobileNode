<template>
    <div id="OutCompanyAdd-box">
        <jd-header :title="title" backUrl="/OutCompanyApi/OutCompanyList"></jd-header>
        <van-cell-group>
            <van-field v-model="from.InsertUserFullName" label="姓名" placeholder="请输入姓名" />
            <van-field v-model="from.DepartName" label="部门" placeholder="请输入部门" />
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
                <van-col :span="6">公出原因</van-col>
                <van-col>
                    <van-radio-group v-model="from.ChangeCate">
                        <van-radio class="radio-item" v-for="item in ChangeCateOption" :name="item.id" :key="item.id">{{item.text}}</van-radio>
                    </van-radio-group>
                </van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10" class="flex">
                <van-col :span="6">公出时间</van-col>
                <van-col span="10">
                    <van-button size="small" @click="chooseDate">添加时间</van-button>
                </van-col>
                <van-col class="deleteText" span="8">
                    <span v-if="DateDetailArr.length" class="deleteText" @click="deleteAll">全部删除({{DateDetailArr.length}})</span>
                </van-col>
            </van-row>
        </van-cell>
        <div class="maxHeight300">
            <van-cell v-if="DateDetailArr.length">
                <van-row v-for="(item,index) in DateDetailArr" :key="item.Date" class="DateArrRow">
                    <van-col span="6">{{item.Date}}</van-col>
                    <van-col span="6">
                        <select v-model="item.AmPmType" class="select-css">
                            <option v-for="itemOption in AmPmTypeOption" :key="itemOption.id" :value="itemOption.id">{{itemOption.text}}</option>
                        </select>
                    </van-col>
                    <van-col class="deleteText" span="6">
                        <span @click="deleteItem(index)">删除</span>
                    </van-col>
                </van-row>
            </van-cell>
        </div>
        <van-cell-group>
            <van-field v-model="from.Remark" label="备注" type="textarea" placeholder="请输入备注" rows="2" autosize />
        </van-cell-group>
        <div class="sub-btn">
            <van-button type="primary" class="btn-item" block @click="SaveHandle">保 存</van-button>
            <van-button type="primary" class="btn-item" v-if="from.ID" plain block @click="SubmitApplyHandle">提交申请</van-button>
            <van-button type="danger" class="btn-item" v-if="from.ID" plain block @click="DeleteHandle">删 除</van-button>
        </div>
        <JdCheckboxDatePopup :popupIsShow="pickerIsShow" @onConfirm="GetCheckedDate"></JdCheckboxDatePopup>
    </div>
</template>

<script>
import {
    mapActions
} from 'vuex';
import header from '../../components/common/header.vue';
import JdCheckboxDatePopup from '../../components/common/checkboxDatePopup';
import MUtil from '../../util/mm';
import BizUtil from '../../util/bizUtil';
import statusTextMap from '../../components/common/statusTextMap';
import { Dialog } from 'vant';

const _mm = new MUtil();
const _bizUtil = new BizUtil();

export default {
    data () {
        return {
            title: '填写公出备案单',
            from: {
                ID: '',
                InsertUserFullName: '',
                DepartName: '',
                DepartID: '',
                Company: '',
                ChangeCate: '',
                Remark: '',
            },
            oldFrom: {}, // 保存旧的数据
            DateDetailArr: [],
            oldDateDetailArrLength: 0, // 保存旧的数据数组长度
            DateArr: [],
            pickerIsShow: false,
            ChangeCateOption: [],
            AmPmTypeOption: _bizUtil.GetAmPmTypeOption()
        }
    },
    components: {
        [header.name]: header,
        [statusTextMap.name]: statusTextMap,
        [JdCheckboxDatePopup.name]: JdCheckboxDatePopup,
    },
    computed: {
    },
    methods: {
        ...mapActions([
            'GetDictListByParent',
            'GetOutCompanyByKey',
            'OutCompanySave',
            'DeleteOutCompanyByKey',
        ]),
        chooseDate() {
            this.pickerIsShow = !this.pickerIsShow;
        },
        GetCheckedDate(val) {
            if (!val.length) {
                _mm.errorTips('未选择日期');
                return;
            }
            val.map((item) => {
                let valStr = item;
                // includes 用来判断一个数组是否包含一个指定的值，返回 true或 false
                if (!this.DateArr.includes(valStr)) {
                    this.DateDetailArr.push({
                        Date: valStr,
                        AmPmType: 1
                    });
                    this.DateArr.push(valStr);
                }
            });
        },
        deleteAll() {
            Dialog.confirm({
                title: '提示',
                message: '你确认要全部删除吗？'
            }).then(() => {
                this.DateArr = [];
                this.DateDetailArr = [];
            }).catch(() => {
            });
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
            if (this.from.InsertUserFullName === '') {
                _mm.errorDialog('请输入姓名');
                return;
            }
            if (this.from.DepartName === '') {
                _mm.errorDialog('请输入部门');
                return;
            }
            if (this.from.ChangeCate === undefined) {
                _mm.errorDialog('请选择公出原因');
                return;
            }
            if (this.DateDetailArr.length === 0) {
                _mm.errorDialog('请选择时间');
                return;
            }
            let subData = Object.assign({}, this.from, {
                DetailArr: this.DateDetailArr
            });
            this.OutCompanySave(subData).then((res) => {
                if (res.success) {
                    _mm.confirmDialog(res.msg, () => {
                        this.$router.push(`/OutCompanyApi/Save/${res.data}`);
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
            if (this.from.ChangeCate !== this.oldFrom.ChangeCate || this.from.Remark !== this.oldFrom.Remark || this.DateDetailArr.length !== this.oldDateDetailArrLength) {
                _mm.errorDialog('修改后需要先保存再提交申请');
                return;
            }
            this.$router.push(`/OutCompanyApi/SubmitConfirm/${ID}`);
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
                this.DeleteOutCompanyByKey(ID).then((res) => {
                    if (res.success) {
                        _mm.successDialog(res.msg);
                        this.$router.push(`/OutCompanyApi/OutCompanyList`);
                    } else {
                        _mm.errorDialog(res.msg);
                    }
                });
            }).catch(() => {
            });
        },
        InitDictListByParent() {
            let data = {
                ParentID: _bizUtil.getOutCompanyReasonParentID()
            };
            this.GetDictListByParent(data).then((res) => {
                if (res) {
                    if (res.length > 0) {
                        this.ChangeCateOption = res.map((item) => {
                            return Object.assign({}, {
                                id: parseInt(item.ID),
                                text: item.DictName,
                            });
                        });
                    }
                }
            });
        },
        getUserInfoFromUtil() {
            _bizUtil.getAllUserInfoFromApiOrLocalPromise().then((userInfo) => {
                this.from = Object.assign({}, {
                    DepartName: userInfo.user.DepartName,
                    InsertUserFullName: userInfo.user.FullName,
                });
            });
        },
        DataInit(ID) {
            this.GetOutCompanyByKey(ID).then((res) => {
                this.from = Object.assign({}, res.model, {
                    ID: res.model.ID,
                    DepartName: res.model.DepartName,
                    InsertUserFullName: res.model.InsertUserFullName,
                    ChangeCate: parseInt(res.model.ChangeCate),
                    Remark: res.model.Remark,
                });
                this.oldFrom = Object.assign({}, this.from); //数据备份，为了比对是否有改动
                this.DateDetailArr = [];
                res.detailList.map((item) => {
                    this.DateDetailArr.push({
                        Date: _mm.formatStrDate(item.TheDay),
                        AmPmType: parseInt(item.AMPM)
                    });
                    this.DateArr.push(_mm.formatStrDate(item.TheDay));
                });
                this.oldDateDetailArrLength = this.DateDetailArr.length; //数据备份，为了比对是否有改动
            });
        },
        paramsInit() {
            let params = this.$route.params;
            if (params.ID !== undefined) {
                //Edit
                this.title = '编辑公出备案单';
                this.DataInit(params.ID);
            } else {
                //Add
                this.getUserInfoFromUtil();
            }
        }
    },
    mounted() {
        this.InitDictListByParent(); //初始化公出原因
        this.paramsInit();
    }
}
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
    @import "../../style/pages/OutCompany/Add";
</style>
