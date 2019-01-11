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
                <van-col :span="6">编号</van-col>
                <van-col>{{pageFrom.DocNumb}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">岗位</van-col>
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
                <van-col :span="6">加班事由</van-col>
                <van-col>{{pageFrom.Reason}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">工作内容</van-col>
                <van-col :span="18">{{pageFrom.WorkDetails}}</van-col>
            </van-row>
        </van-cell>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">工作地点</van-col>
                <van-col :span="18">{{pageFrom.WorkPlace}}</van-col>
            </van-row>
        </van-cell>
        <JdTableList :colNameMap="colNameMap" title="加班时间" :itemList="pageDetailList">
            <th slot="columnHeaderSlot">操作</th>
            <template slot="columnBodySlot" slot-scope="scope">
                <td align="center">
                    <span class="operationText" @click="detailItem(scope.item)">查看详情</span>
                </td>
            </template>
        </JdTableList>
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
        <JdPopup :popupIsShow="itemDetailPopupIsShow" @onConfirm="itemDetailOnConfirm">
            <van-cell>
                <van-row>
                    <van-col span="8">日期</van-col>
                    <van-col>{{itemDetail.Date}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col span="8">加班类型</van-col>
                    <van-col>{{itemDetail.WorkOverTimeTypeText}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col span="8">公司内/外</van-col>
                    <van-col>{{itemDetail.OutOrInText}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col span="8">加班开始时间</van-col>
                    <van-col>{{itemDetail.StartTimeOnly}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col span="8">加班结束时间</van-col>
                    <van-col>{{itemDetail.EndTimeOnly}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col span="8">工时数</van-col>
                    <van-col v-if="itemDetail.OutOrIn === '1'">以打卡时间为准</van-col>
                    <van-col v-if="itemDetail.OutOrIn === '0'">{{itemDetail.Hours}}</van-col>
                </van-row>
            </van-cell>
        </JdPopup>
    </div>
</template>

<script>
import {
    mapActions, mapGetters
} from 'vuex';
import popup from '../../components/common/popup';
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
        key: 'WorkOverTimeTypeText',
        displayName: '加班类型',
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
    name: 'OverTimeWorkCommon',
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
            OutOrInOption: _bizUtil.getOutOrInOption(),
            itemDetailPopupIsShow: false,
            itemDetail: {},
        }
    },
    components: {
        [tableList.name]: tableList,
        [popup.name]: popup,
        [statusTextMap.name]: statusTextMap,
        [ApproveFinishSeal.name]: ApproveFinishSeal,
    },
    computed: {
        ...mapGetters([
            'OverTimeWorkTypeList',
        ]),
    },
    watch: {
        model(val) {
            this.pageFrom = Object.assign({}, val, {
                StatusText: _bizUtil.JDApproveStatusMap(val.Status),
                Reason: val.Reson, // 获取公出类型名称
            });
        },
        detailList(val) {
            if (this.OverTimeWorkTypeList.length) {
                let arr = [];
                val.map((item) => {
                    let temp = this.OverTimeWorkTypeList.filter(itemType => itemType.id === item.WorkOverTimeTypeID);
                    let WorkOverTimeTypeText = temp && temp.length ? temp[0].text : '';
                    arr.push(Object.assign({}, item, {
                        Hours: item.Hours,
                        Date: _mm.formatStrDate(item.TheDay),
                        WorkOverTimeTypeText: WorkOverTimeTypeText
                    }));
                });
                this.pageDetailList = arr;
            }
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
            'GetOverTimeWorkTypeList'
        ]),
        detailItem(item) {
            item.OutOrIn = item.OutOrIn === 'True' ? '1' : '0';
            if (this.OverTimeWorkTypeList.length) {
                let temp = this.OverTimeWorkTypeList.filter(itemType => itemType.id === item.WorkOverTimeTypeID);
                let temp2 = this.OutOrInOption.filter(itemType => itemType.id === item.OutOrIn);
                let WorkOverTimeTypeText = temp && temp.length ? temp[0].text : '';
                let OutOrInText = temp2 && temp2.length ? temp2[0].text : '';
                this.itemDetail = Object.assign({}, item, {
                    StartTimeOnly: _mm.formatTimeOnly(item.StartTime),
                    EndTimeOnly: _mm.formatTimeOnly(item.EndTime),
                    WorkOverTimeTypeText: WorkOverTimeTypeText, // 加班类型名称
                    OutOrInText: OutOrInText, // 公司内外名称
                });
                this.itemDetailPopupIsShow = !this.itemDetailPopupIsShow;
            }
        },
        itemDetailOnConfirm() {}
    },
    mounted() {
        this.GetOverTimeWorkTypeList();
    }
}
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
</style>
