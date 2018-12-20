<template>
    <div class="PersonAskForLeaveCommon">
        <van-cell-group>
            <van-field v-model="pageFrom.DepartName" label="部门" disabled />
            <van-field v-model="pageFrom.FullName" label="姓名" disabled />
            <van-field v-model="pageFrom.DocNumb" label="编号" disabled />
            <van-field v-model="pageFrom.PostName" label="岗位" disabled />
            <van-field v-model="pageFrom.EntrantDate" label="入职日期" disabled />
            <van-field v-model="pageFrom.AskReason" disabled label="请假原因" type="textarea" placeholder="请输入请假原因" rows="2" autosize disabled />
            <van-field v-model="pageFrom.AskInsertTime" label="提交时间" disabled />
            <van-field v-model="pageFrom.CancelReason" label="销假原因" type="textarea" placeholder="请输入销假原因..." rows="2" autosize disabled />
        </van-cell-group>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">状态</van-col>
                <van-col :span="18" v-if="pageFrom.Status === '61'"><van-tag>{{pageFrom.StatusText}}</van-tag></van-col>
                <van-col :span="18" v-if="pageFrom.Status === '62'"><van-tag type="primary">{{pageFrom.StatusText}}</van-tag></van-col>
                <van-col :span="18" v-if="pageFrom.Status === '63'"><van-tag type="success">{{pageFrom.StatusText}}</van-tag></van-col>
                <van-col :span="18" v-if="pageFrom.Status === '64'"><van-tag type="danger">{{pageFrom.StatusText}}</van-tag></van-col>
                <van-col :span="18" v-if="pageFrom.Status === '65'"><van-tag type="danger">{{pageFrom.StatusText}}</van-tag></van-col>
                <van-col :span="18" v-if="pageFrom.Status === '66'"><van-tag type="danger">{{pageFrom.StatusText}}</van-tag></van-col>
                <van-col :span="18" v-if="pageFrom.Status === '68'"><van-tag>{{pageFrom.StatusText}}</van-tag></van-col>
                <van-col :span="18" v-if="pageFrom.Status === null"><van-tag>{{pageFrom.StatusText}}</van-tag></van-col>
            </van-row>
        </van-cell>
        <JdTableList v-if="false" :colNameMap="colNameMap" title="请假日期" :itemList="pageDateDetailList"></JdTableList>
        <van-cell v-if="pageDateDetailList.length">
            <van-row>
                <van-col :span="24" class="table-title">请假日期</van-col>
            </van-row>
            <van-row class="row">
                <van-col span="24">
                    <table>
                        <tr v-if="colNameMap.length">
                            <th v-for="column in colNameMap" :width="column.width">{{column.displayName}}</th>
                        </tr>
                        <!--IsAble === 0 表示不可用-->
                        <tr v-if="colNameMap.length && item.IsAble === 0" v-for="(item, index) in pageDateDetailList" :key="index">
                            <td :class="column.ellipsis ? 'ellipsis' : column.lineThrough ? 'lineThrough' : ''" :align="!column.align ? 'center' : column.align"
                                v-if="colNameMap.length" v-for="column in colNameMap" :width="column.width">
                                {{item[column.key]}}
                            </td>
                        </tr>
                        <tr v-if="colNameMap.length  && item.IsAble === 1" v-for="(item, index) in pageDateDetailList" :key="index">
                            <td :class="column.ellipsis ? 'ellipsis' : ''" :align="!column.align ? 'center' : column.align"
                                v-if="colNameMap.length" v-for="column in colNameMap" :width="column.width">
                                {{item[column.key]}}
                            </td>
                        </tr>
                    </table>
                </van-col>
            </van-row>
        </van-cell>
        <JdTableList :colNameMap="colNameMapApprove" title="审批记录" :itemList="pageWorkFlowsDetailList"></JdTableList>
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
            lineThrough: true,
        }, {
            key: 'AskTypeText',
            displayName: '请假类型',
        }, {
            key: 'AmPmTypeText',
            displayName: '上午/下午',
        }, {
            key: 'IsAbleText',
            displayName: '状态',
        }
    ];

    const colNameMapApprove = [
        {
            key: 'ActiveName',
            displayName: '审批步骤',
            align: 'left',
            width: '50%',
            ellipsis: true,
        }, {
            key: 'ExecPersonNames',
            displayName: '审批人',
        }, {
            key: 'OperatorTypeText',
            displayName: '状态',
        }
    ];

    export default {
        name: "AskForLeaveCancelApprovalCommon",
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
                colNameMapApprove,
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
                            AmPmTypeText: tempAmPmType.text,
                            IsAble: item.IsAble === 'False' ? 0 : 1,
                            IsAbleText: item.IsAble === 'False' ? '已取消' : '正常'
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
