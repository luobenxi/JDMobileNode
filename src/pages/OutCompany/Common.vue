<template>
    <div>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">姓名</van-col>
                <van-col>{{pageFrom.InsertUserFullName}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">部门</van-col>
                <van-col>{{pageFrom.DepartName}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">职务</van-col>
                <van-col>{{pageFrom.PostName}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">状态</van-col>
                <van-col>
                    <JdStatusTextMap :Status="pageFrom.Status"></JdStatusTextMap>
                </van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">公出原因</van-col>
                <van-col>{{pageFrom.ChangeCateText}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">备注</van-col>
                <van-col :span="18">{{pageFrom.Remark}}</van-col>
            </van-row>
        </van-cell>
        <JdTableList :colNameMap="colNameMap" title="公出时间" :itemList="pageDetailList"></JdTableList>
        <JdTableList :colNameMap="colNameMapApprove" title="审批记录" :itemList="pageWorkFlowList">
            <th slot="columnHeaderSlot">状态</th>
            <template slot="columnBodySlot" slot-scope="scope">
                <td align="center">
                    <JdStatusTextMap :Status="scope.item.OperatorType"></JdStatusTextMap>
                </td>
            </template>
        </JdTableList>
        <JdApproveFinishSeal v-if="pageFrom.Status === '63'"></JdApproveFinishSeal>
        <div></div>
    </div>
</template>

<script>
import {
    mapActions
} from 'vuex';
import statusTextMap from '../../components/common/statusTextMap';
import tableList from '../../components/common/table-list';
import ApproveFinishSeal from '../../components/common/ApproveFinishSeal';
import MUtil from '../../util/mm';
import BizUtil from '../../util/bizUtil';

const _mm = new MUtil();
const _bizUtil = new BizUtil();

const colNameMap = [
    {
        key: 'Date',
        displayName: '日期',
    }, {
        key: 'AmPmTypeText',
        displayName: '上午/下午',
    }, {
        key: 'Hours',
        displayName: '工时',
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
    }
];

export default {
    name: 'OutCompanyCommon',
    props: {
        model: {
            type: Object,
            default: () => {}
        },
        detailList: {
            type: Array,
            default: () => []
        },
        workFlowList: {
            type: Array,
            default: () => []
        },
    },
    data () {
        return {
            colNameMap,
            colNameMapApprove,
            pageFrom: {},
            pageDetailList: [],
            pageWorkFlowList: [],
            AmPmTypeOption: _bizUtil.GetAmPmTypeOption(),
            ChangeCateOption: [],
        }
    },
    components: {
        [tableList.name]: tableList,
        [statusTextMap.name]: statusTextMap,
        [ApproveFinishSeal.name]: ApproveFinishSeal,
    },
    watch: {
        model(val) {
            let ChangeCateRow = this.ChangeCateOption.filter((item) => { return item.id === parseInt(val.ChangeCate) });
            this.pageFrom = Object.assign({}, val, {
                StatusText: _bizUtil.JDApproveStatusMap(val.Status),
                EntrantDate: _mm.formatDate(val.EntrantDate),
                ChangeCate: parseInt(val.ChangeCate),
                ChangeCateText: ChangeCateRow && ChangeCateRow.length ? ChangeCateRow[0].text : '', // 获取公出类型名称
            });
        },
        detailList(val) {
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
                this.pageDetailList = arr;
            });
        },
        workFlowList(val) {
            let arr = [];
            val.map((item) => {
                let temp = Object.assign({}, item, {
                    OperatorTypeText: _bizUtil.JDApproveStatusMap(item.OperatorType),
                    OperatorTime: _mm.formatDate(item.OperatorTime),
                });
                arr.push(temp);
            });
            this.pageWorkFlowList = arr;
        }
    },
    methods: {
        ...mapActions([
            'GetDictListByParent'
        ]),
        InitDictListByParent() {
            let data = {
                ParentID: _bizUtil.getOutCompanyReasonParentID()
            };
            this.GetDictListByParent(data).then((res) => {
                if (res && res.length) {
                    this.ChangeCateOption = res.map((item) => {
                        return Object.assign({}, {
                            id: parseInt(item.ID),
                            text: item.DictName,
                        });
                    });
                }
            });
        },
    },
    mounted() {
        // 请求公出类型可以在公共组件请求
        this.InitDictListByParent();
    }
}
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
</style>
