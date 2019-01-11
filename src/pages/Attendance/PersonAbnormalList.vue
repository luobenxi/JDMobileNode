<template>
    <div class="AttendanceBox">
        <jd-header title="我的考勤异常" :backUrl="backUrl"></jd-header>
        <JdDatetimePickerSwitch :showDate="currentDateStr" @changeDate="changeDateHandle"></JdDatetimePickerSwitch>
        <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad">
            <jd-list
                 ref="AttendanceAbnormalList"
                 :colNameMap="colNameMap"
                 :itemList="itemList"
                 :originPaging="AttendanceAbnormalList.paging"
                 @clickCallBack="clickHandle"
                 @getData="getList"
                >
                <template slot="handlerColumn" slot-scope="scope">
                    <span  v-if="scope.item.Status === '0'">未确认</span>
                    <span  v-if="scope.item.Status === '1'">已确认</span>
                    <van-tag  v-if="scope.item.Status === '0'" type="danger">确认</van-tag>
                    <van-tag  v-if="scope.item.Status === '1'" type="success">查看</van-tag>
                </template>
            </jd-list>
        </van-list>
        <div v-if="!AttendanceAbnormalList.itemList" class="empty">暂无数据</div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import header from '../../components/common/header.vue';
import MUtil from '../../util/mm';
import BizUtil from '../../util/bizUtil';
import list from '../../components/common/list';
import JdDatetimePickerSwitch from '../../components/common/datetimePickerSwitch';

const _mm = new MUtil();
const bizMap = new BizUtil();

export default {
    data () {
        return {
            backUrl: _mm.GetEmployeeSelfHelpUrl(),
            currentDateStr: _mm.formatMonth(new Date()),
            loading: false,
            finished: false,
            colNameMap: {
                key: 'ID',
                colName: ['FullName', 'AbnormalResult']
            }
        }
    },
    computed: {
        ...mapGetters([
            'AttendanceAbnormalList',
        ]),
        itemList() {
            return this.formatItemList();
        },
    },
    components: {
        [list.name]: list,
        [header.name]: header,
        [JdDatetimePickerSwitch.name]: JdDatetimePickerSwitch,
    },
    methods: {
        ...mapActions([
            'GetAttendanceAbnormalList'
        ]),
        changeDateHandle(val) {
            this.currentDateStr = _mm.formatMonth(val);
            this.$refs.AttendanceAbnormalList.queryHandler(); // 重新请求数据
        },
        formatItemList() {
            if (this.AttendanceAbnormalList.itemList) {
                return this.AttendanceAbnormalList.itemList;
            }
        },
        clickHandle(item) {
            this.$router.push(`/AttendanceApi/ConfirmAbnormalReason/${item.ID}`);
        },
        getList(paging) {
            this.getListHandle(paging);
        },
        getListHandle(paging) {
            let condition = {
                paging: paging,
                condition: {
                    YYear: bizMap.SplitDateToArr(this.currentDateStr).YYear,
                    MMonth: bizMap.SplitDateToArr(this.currentDateStr).MMonth,
                    Date: ''
                }
            };
            _mm.setStorage('AttendanceCurrentDate', this.currentDateStr);
            this.GetAttendanceAbnormalList(condition).then(() => {
                this.loading = false;
                this.finished = true;
            });
        },
        onLoad() {
            this.$refs.AttendanceAbnormalList.queryHandler();
        },
    },
    mounted() {
        let AttendanceCurrentDate = _mm.getStorage('AttendanceCurrentDate');
        this.currentDateStr = AttendanceCurrentDate ? AttendanceCurrentDate : this.currentDateStr;
    }
}
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
</style>
