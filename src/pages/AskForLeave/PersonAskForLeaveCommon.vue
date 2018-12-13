<template>
    <div class="PersonAskForLeaveCommon">
        <van-cell-group>
            <van-field v-model="pageFrom.DepartName" label="部门" disabled />
            <van-field v-model="pageFrom.UserFullName" label="姓名" disabled />
            <van-field v-model="pageFrom.DocNumb" label="编号" disabled />
            <van-field v-model="pageFrom.PostName" label="岗位" disabled />
            <van-field v-model="pageFrom.EntrantDate" label="入职日期" disabled />
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="pageFrom.Reason" disabled label="请假原因" type="textarea" placeholder="请输入请假原因" rows="2" autosize />
        </van-cell-group>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">状态</van-col>
                <van-col :span="18" style="color: #67C23A" v-if="pageFrom.Status === '63'">{{pageFrom.StatusText}}</van-col>
                <van-col :span="18" v-else>{{pageFrom.StatusText}}</van-col>
            </van-row>
        </van-cell>
        <JdTableList :colNameMap="colNameMap" title="请假日期" :itemList="pageDateDetailList"></JdTableList>
        <van-cell v-if="pageWorkFlowsDetailList.length">
            <van-row gutter="10">
                <van-col :span="6">审批信息</van-col>
            </van-row>
        </van-cell>
        <van-cell v-if="pageWorkFlowsDetailList.length">
            <van-row type="flex" justify="space-around" v-for="(item, index) in pageWorkFlowsDetailList" :key="index">
                <van-col :span="12">{{index + 1}}.{{item.ActiveName}}</van-col>
                <van-col :span="6">{{item.ExecPersonNames}}</van-col>
                <!--已通过-->
                <van-col :span="6" v-if="item.OperatorType === '63'" style="color: #67C23A">{{item.OperatorTypeText}}</van-col>
                <!--已拒绝-->
                <van-col :span="6" v-if="item.OperatorType === '64'" style="color: #F56C6C">{{item.OperatorTypeText}}</van-col>
                <!--除了 已通过、已拒绝-->
                <van-col :span="6" v-if="item.OperatorType !== '63' && item.OperatorType !== '64'">{{item.OperatorTypeText}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">附件列表</van-col>
            </van-row>
        </van-cell>
        <van-cell v-if="pageUploadFinishList.length">
            <jd-file-list :InitFileList="pageUploadFinishList"></jd-file-list>
        </van-cell>
        <div></div>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    import header from '../../components/common/header';
    import fileList from '../../components/common/file-list';
    import tableList from '../../components/common/table-list';
    import MUtil from '../../util/mm';
    import BizUtil from '../../util/bizUtil';
    import { Dialog } from 'vant';

    const _mm = new MUtil();
    const _bizUtil = new BizUtil();

    const colNameMap = [
        {
            key: 'Date',
            displayName: '日期',
        }, {
            key: 'AskTypeText',
            displayName: '请假类型',
        }, {
            key: 'AmPmTypeText',
            displayName: '上午/下午',
        }, {
            key: 'Hours',
            displayName: '工时',
        }
    ];

    export default {
        name: "PersonAskForLeaveCommon",
        props: {
            dateDetailList: {
                type: Array,
                default: () => []
            },
            from: {
                type: Object,
                default: () => {}
            },
            uploadFinishList: {
                type: Array,
                default: () => []
            },
            workFlowsDetailList: {
                type: Array,
                default: () => []
            },
        },
        data () {
            return {
                colNameMap,
                pageFrom: {},
                pageDateDetailList: [],
                pageWorkFlowsDetailList: [],
                pageUploadFinishList: [],
                AskTypeOption: [],
                AmPmTypeOption: _bizUtil.GetAmPmTypeOption(),
            }
        },
        components: {
            [header.name]: header,
            [fileList.name]: fileList,
            [tableList.name]: tableList,
        },
        watch: {
            from(val) {
                this.pageFrom = Object.assign({}, val, {
                    StatusText: _bizUtil.JDApproveStatusMap(val.Status),
                    EntrantDate: _mm.formatDate(val.EntrantDate),
                    Reason: val.Reson
                });
            },
            dateDetailList(val) {
                _bizUtil.GetAskTypeOptionPromise().then(res => {
                    this.AskTypeOption = res;
                    let arr = [];
                    val.map((item) => {
                        let tempAskType = this.AskTypeOption.filter(aa => aa.id === item.AskForLeaveTypeID)[0];
                        let tempAmPmType = this.AmPmTypeOption.filter(aa => aa.id === parseInt(item.AMPM))[0];
                        arr.push({
                            Hours: item.Hours,
                            Date: _mm.formatStrDate(item.TheDay),
                            AskTypeText: tempAskType ? tempAskType.text : '',
                            AmPmTypeText: tempAmPmType.text
                        });
                    });
                    this.pageDateDetailList = arr;
                });
            },
            uploadFinishList(val) {
                let arr = [];
                 val.map((item) => {
                     arr.push({
                        SavePath: item.FilePath,
                        name: item.FileName
                    });
                });
                this.pageUploadFinishList = arr;
            },
            workFlowsDetailList(val) {
                let arr = [];
                 val.map((item) => {
                    let temp = Object.assign({}, item, {
                        OperatorTypeText: _bizUtil.JDApproveStatusMap(item.OperatorType),
                        OperatorTime: _mm.formatDate(item.OperatorTime),
                    });
                     arr.push(temp);
                });
                this.pageWorkFlowsDetailList = arr;
            }
        },
        methods: {
            ...mapActions([
            ]),
        },
        mounted() {
        }
    }
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
</style>
