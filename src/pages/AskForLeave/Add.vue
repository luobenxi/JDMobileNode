<template>
    <div id="OutCompanyAdd-box">
        <jd-header :title="title" backUrl="/OutCompanyApi/OutCompanyList"></jd-header>
        <van-cell-group>
            <van-field v-model="from.InsertUserFullName" label="姓名" placeholder="请输入姓名" />
            <van-field v-model="from.ErpID" label="编号" placeholder="请输入编号" />
            <van-field v-model="from.DepartName" label="部门" placeholder="请输入部门" />
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
            <van-field
                v-model="from.Remark"
                label="请假原因"
                type="textarea"
                placeholder="请输入请假原因"
                rows="2"
                autosize
            />
        </van-cell-group>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">上传附件</van-col>
                <van-col>
                    <van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/jpg, image/png" multiple>
                        <van-icon name="photograph" />
                    </van-uploader>
                </van-col>
            </van-row>
        </van-cell>
        <van-cell v-if="UploadFinishList.length">
            <van-row type="flex" v-for="(item, index) in UploadFinishList" :key="index" justify="space-around" class="DateArrRow">
                <van-col span="18">
                    <img :src="item" alt="图片" style="width: 100%">
                </van-col>
                <van-col class="deleteText" span="6" style="display: flex; align-items: center; justify-content: center">
                    <span @click="deleteFileItem(index)">删除</span>
                </van-col>
            </van-row>
        </van-cell>
        <van-loading class="loading-box" v-if="FileListBoxIsShow" color="#909399"/>
        <div class="sub-btn">
            <van-button type="primary" class="btn-item" block @click="SaveHandle">保 存</van-button>
        </div>
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
    </div>
</template>

<script>
import {
    mapActions
} from 'vuex';
import header from '../../components/common/header.vue';
import JdDatetimePicker from '../../components/common/datetimePicker';
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
                ErpID: '',
                InsertUserFullName: '',
                DepartName: '',
                DepartID: '',
                Company: '',
                ChangeCate: '',
                Remark: '',
            },
            FileListBoxIsShow: false,
            UploadFinishList: [],
            oldFrom: {}, // 保存旧的数据
            DateDetailArr: [],
            oldDateDetailArrLength: 0, // 保存旧的数据数组长度
            DateArr: [],
            pickerIsShow: false,
            ChangeCateOption: [],
            AskTypeOption: _bizUtil.GetAskTypeOption(),
            AmPmTypeOption: _bizUtil.GetAmPmTypeOption(),
        }
    },
    components: {
        [header.name]: header,
        [JdDatetimePicker.name]: JdDatetimePicker,
    },
    computed: {
    },
    methods: {
        ...mapActions([
            'UploadFileHandle',
            'GetUserInfo',
        ]),
        onRead(file) {
            let data = [];
            if (file.length > 1) {
                file.map((item) => {
                    data.push(
                        Object.assign({}, {
                            content: item.content.split(',')[1],
                            name: item.file.name,
                            size: item.file.size,
                            type: item.file.type,
                            sizeUnit: _mm.FileSizeUnitConvent(item.file.size),
                        })
                    );
                });
            } else {
                data.push(
                    Object.assign({}, {
                        content: file.content.split(',')[1],
                        name: file.file.name,
                        size: file.file.size,
                        type: file.file.type,
                        sizeUnit: _mm.FileSizeUnitConvent(file.file.size),
                    })
                );
            }
            this.UploadFileSubmit(data);
        },
        deleteFileItem(index) {
            Dialog.confirm({
                title: '提示',
                message: '你确认要删除该附件吗？'
            }).then(() => {
                this.UploadFinishList.splice(index, 1); // 从下标为index删除，删除一个元素
            }).catch(() => {
            });
        },
        UploadFileSubmit(data) {
            if (data.length === 0) {
                _mm.errorTips('未选择附件');
                return;
            }
            this.FileListBoxIsShow = true;
            this.UploadFileHandle(data).then((res) => {
                this.FileListBoxIsShow = false;
                if (res.success) {
                    this.UploadFinishList.push(...res.data);
                    _mm.successTips(res.msg);
                } else {
                    _mm.errorTips(res.msg);
                }
            });
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
            return false;
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
                    _mm.successDialog(res.msg);
                    this.$router.push(`/OutCompanyApi/Save/${res.data}`);
                    setTimeout((_) => {
                        this.$router.go(0); // 刷新当前页面
                    }, 800);
                } else {
                    _mm.errorDialog(res.msg);
                }
            });
        },
        getUserInfoFromDb() {
            let userStr = _mm.getStorage('user.info');
            if (!userStr) {
                this.GetUserInfo().then((user) => {
                    _mm.setStorage('user.info', user);
                    this.from = Object.assign({}, {
                        ErpID: 'JD' + user.ErpID,
                        DepartName: user.DepartName,
                        InsertUserFullName: user.FullName
                    });
                });
            } else {
                let user = JSON.parse(userStr);
                this.from = Object.assign({}, {
                    ErpID: 'JD' + user.ErpID,
                    DepartName: user.DepartName,
                    InsertUserFullName: user.FullName
                });
            }
        },
        paramsInit() {
            let params = this.$route.params;
            if (params.ID !== undefined) {
            } else {
                //Add
                this.getUserInfoFromDb();
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
    @import "../../style/pages/OutCompany/Add";
</style>
