<template>
    <div id="OutCompanyAdd-box">
        <jd-header :title="title"></jd-header>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">姓名</van-col>
                <van-col>{{from.InsertUserFullName}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">部门</van-col>
                <van-col>{{from.DepartName}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">职务</van-col>
                <van-col>{{from.PostName}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">状态</van-col>
                <van-col>{{from.StatusText}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">公出原因</van-col>
                <van-col>{{from.ChangeCateText}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">公出时间</van-col>
                <van-col :span="18">
                    <van-row v-if="DateDetailArr.length" v-for="item in DateDetailArr" :key="item.Date">
                        <van-col span="12">{{item.Date}}</van-col>
                        <van-col span="12">{{item.AmPmTypeText}}</van-col>
                    </van-row>
                </van-col>
            </van-row>
        </van-cell>
        <van-cell-group>
            <van-field
                v-model="from.Remark"
                label="备注"
                type="textarea"
                disabled
                placeholder="备注信息"
                rows="2"
                autosize
            />
        </van-cell-group>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6" style="color: red">审批人</van-col>
                <van-col>
                    <van-radio-group v-model="ApprovalUserID">
                        <van-radio name="1">杨云江</van-radio>
                    </van-radio-group>
                </van-col>
            </van-row>
        </van-cell>
        <div class="sub-btn">
            <van-button type="danger" class="btn-item" v-if="from.ID" plain block @click="SubmitApplyHandle">确认提交</van-button>
            <van-button type="primary" class="btn-item" v-if="from.ID" plain block @click="backEdit">返回修改</van-button>
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
            title: '公出备案单确认',
            from: {
                ID: '',
                InsertUserFullName: '',
                DepartName: '',
                DepartID: '',
                Company: '',
                ChangeCate: '',
                ChangeCateText: '',
                Remark: '',
            },
            ApprovalUserID: '1',
            DateDetailArr: [],
            ChangeCateOption: [],
            AmPmTypeOption: _bizUtil.GetAmPmTypeOption()
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
            'GetDictListByParent',
            'GetOutCompanyByKey',
        ]),
        SubmitApplyHandle() {
            console.log(this.from);
        },
        backEdit() {
            this.$router.push(`/OutCompanyApi/Save/${this.from.ID}`);
        },
        InitDictListByParent() {
            let data = {
                ParentID: 542 // 字典表ID=542的记录为公出原因
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
        DataInit(ID) {
            this.GetOutCompanyByKey(ID).then((res) => {
                let ChangeCateText = this.ChangeCateOption.filter((item) => { return item.id === parseInt(res.model.ChangeCate) });
                this.from = Object.assign({}, res.model, {
                    ChangeCate: parseInt(res.model.ChangeCate),
                    ChangeCateText: ChangeCateText ? ChangeCateText[0].text : '',
                    StatusText: res.StatusText
                });
                res.detailList.map((item) => {
                    let tempAmPmType = this.AmPmTypeOption.filter((item2) => { return item2.id === parseInt(item.AMPM) });
                    this.DateDetailArr.push({
                        Date: _mm.formatStrDate(item.TheDay),
                        AmPmType: parseInt(item.AMPM),
                        AmPmTypeText: tempAmPmType ? tempAmPmType[0].text : '',
                    });
                });
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
        this.InitDictListByParent();
        this.paramsInit();
    }
}
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
    @import "../../style/pages/OutCompany/Add";
</style>
