<template>
    <div>
        <jd-header title="我的加班单" :backUrl="backUrl"></jd-header>
        <JdDatetimePickerSwitch :showDate="currentDateStr" switchType="year" @changeDate="changeDateHandle">
            <van-button size="small" slot="rightTopBtn" type="primary" @click="Add">添加</van-button>
        </JdDatetimePickerSwitch>
        <jd-list
            ref="OverTimeWorkList"
            :colNameMap="colNameMap"
            :itemList="itemList"
            :originPaging="OverTimeWorkList.paging"
            @clickCallBack="clickItemHandle"
            @getData="getList">
            <template slot="handlerColumn" slot-scope="scope">
                <JdStatusTextMap :Status="scope.item.Status"></JdStatusTextMap>
            </template>
        </jd-list>
        <div v-if="!OverTimeWorkList.itemList" class="empty">暂无数据</div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import header from '../../components/common/header';
import MUtil from '../../util/mm';
import BizUtil from '../../util/bizUtil';
import list from '../../components/common/list';
import statusTextMap from '../../components/common/statusTextMap';
import JdDatetimePickerSwitch from '../../components/common/datetimePickerSwitch';

const _mm = new MUtil();
const _bizMap = new BizUtil();

export default {
    data () {
        return {
            backUrl: _mm.GetEmployeeSelfHelpUrl(),
            currentDateStr: _mm.formatYear(new Date()),
            pickerIsShow: false,
            colNameMap: {
                key: 'ID',
                colName: ['Title', 'InsertTime']
            }
        }
    },
    computed: {
        ...mapGetters([
            'OverTimeWorkList',
        ]),
        itemList() {
            return this.formatItemList();
        },
    },
    components: {
        [list.name]: list,
        [header.name]: header,
        [statusTextMap.name]: statusTextMap,
        [JdDatetimePickerSwitch.name]: JdDatetimePickerSwitch,
    },
    methods: {
        ...mapActions([
            'GetOverTimeWorkList'
        ]),
        Add() {
            this.$router.push(`/OverTimeWork/Save`);
        },
        changeDateHandle(val) {
            this.currentDateStr = _mm.formatYear(val);
            this.onLoad(); // 重新请求数据
        },
        formatItemList() {
            if (this.OverTimeWorkList.itemList) {
                return this.OverTimeWorkList.itemList.map(item => {
                    return Object.assign({}, item, {
                        InsertTime: _mm.formatDate(item.InsertTime),
                    })
                });
            }
        },
        clickItemHandle(item) {
            let Status = parseInt(item.Status);
            let url = '';
            if (Status === 61 || Status === 64 || Status === 68) {
                // 未提交、已拒绝、撤回，跳转到编辑页面
                url = `/OverTimeWork/Save/${item.ID}`;
            } else {
                // 跳转到查看页面
                url = `/OverTimeWork/View/${item.ID}`;
            }
            this.$router.push(url);
        },
        getList(paging) {
            this.getListHandle(paging);
        },
        getListHandle(paging) {
            let condition = {
                paging: paging,
                condition: {
                    YYear: _bizMap.SplitDateToArr(this.currentDateStr).YYear,
                }
            };
            this.GetOverTimeWorkList(condition).then(() => {});
        },
        onLoad() {
            this.$refs.OverTimeWorkList.queryHandler();
        },
    },
    mounted() {
        this.onLoad();
    }
}
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
</style>
