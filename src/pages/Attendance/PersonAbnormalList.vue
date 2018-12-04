<template>
    <div id="attendance-box">
        <jd-header title="我的考勤异常" :backUrl="backUrl"></jd-header>
        <van-cell>
            <van-row gutter="10">
                <van-col :span="6">
                    <van-button size="small" @click="chooseDate">选择时间</van-button>
                </van-col>
                <van-col class="currentDateStrBox">
                    {{currentDateStr}}
                </van-col>
            </van-row>
        </van-cell>
        <div>
            <van-popup v-model="pickerIsShow" position="bottom" :overlay="true" @click-overlay="clickOverlay">
                <JdDatetimePicker
                    @onCancel="onCancel"
                    @onConfirm="onConfirm"
                >
                </JdDatetimePicker>
            </van-popup>
        </div>
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
                 @getData="getTodoList"
            >
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
import JdDatetimePicker from '../../components/common/datetimePicker';

const _mm = new MUtil();
const bizMap = new BizUtil();

export default {
    data () {
        return {
            backUrl: _mm.GetEmployeeSelfHelpUrl(),
            currentDateStr: _mm.formatMonth(new Date()),
            // currentDateStr: '2018-09',
            pickerIsShow: false,
            loading: false,
            finished: false,
            colNameMap: {
                key: 'ID',
                colName: ['FullName', 'AbnormalResult', 'Status'],
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
        [JdDatetimePicker.name]: JdDatetimePicker,
    },
    methods: {
        ...mapActions([
            'GetAttendanceAbnormalList'
        ]),
        chooseDate() {
            this.pickerIsShow = true;
        },
        clickOverlay() {
            this.pickerIsShow = false;
        },
        onCancel(val) {
            this.pickerIsShow = false;
        },
        onConfirm(val) {
            this.currentDateStr = _mm.formatMonth(val);
            _mm.setStorage('AttendanceCurrentDate', this.currentDateStr);
            this.pickerIsShow = false;
            this.$refs.AttendanceAbnormalList.queryHandler();
        },
        formatItemList() {
            if (this.AttendanceAbnormalList.itemList) {
                return this.AttendanceAbnormalList.itemList;
            }
        },
        clickHandle(item) {
            this.$router.push(`/AttendanceApi/ConfirmAbnormalReason/${item.ID}`);
        },
        getTodoList(paging) {
            this.getTodoListHandle(paging);
        },
        getTodoListHandle(paging) {
            let condition = {
                paging: paging,
                condition: {
                    YYear: bizMap.SplitDateToArr(this.currentDateStr).YYear,
                    MMonth: bizMap.SplitDateToArr(this.currentDateStr).MMonth,
                    Date: ''
                }
            };
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
