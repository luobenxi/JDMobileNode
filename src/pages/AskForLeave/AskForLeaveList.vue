<template>
    <div id="AskForLeaveListBox">
        <jd-header title="我的请假单" :backUrl="backUrl"></jd-header>
        <JdDatetimePickerSwitch :showDate="currentDateStr" switchType="year" @changeDate="changeDateHandle">
            <van-button size="small" slot="rightTopBtn" type="primary" @click="Add">添加</van-button>
        </JdDatetimePickerSwitch>
        <jd-list
            ref="AskForLeaveList"
            :colNameMap="colNameMap"
            :itemList="itemList"
            :originPaging="AskForLeaveList.paging"
            @clickCallBack="clickItemHandle"
            @getData="getList">
            <template slot="handlerColumn" slot-scope="scope">
                <JdStatusTextMap :Status="scope.item.Status"></JdStatusTextMap>
            </template>
        </jd-list>
        <div v-if="!AskForLeaveList.itemList" class="empty">暂无数据</div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import header from '../../components/common/header.vue';
    import MUtil from '../../util/mm';
    import BizUtil from '../../util/bizUtil';
    import list from '../../components/common/list';
    import statusTextMap from '../../components/common/statusTextMap';
    import JdDatetimePickerSwitch from '../../components/common/datetimePickerSwitch';
    import AjaxUtil from '../../axios/index';

    const _mm = new MUtil();
    const _bizUtil = new BizUtil();
    const ajax = new AjaxUtil();

    export default {
        data () {
            return {
                backUrl: _mm.GetEmployeeSelfHelpUrl(),
                currentDateStr: _mm.formatYear(new Date()),
                colNameMap: {
                    key: 'ID',
                    colName: ['Title', 'InsertTime'], // 'InsertTime', 'StatusText'
                }
            }
        },
        computed: {
            ...mapGetters([
                'AskForLeaveList',
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
                'GetAskForLeaveList'
            ]),
            Add() {
                this.$router.push(`/AskForLeave/Save`);
            },
            formatItemList() {
                if (this.AskForLeaveList.itemList) {
                    return this.AskForLeaveList.itemList.map((item) => {
                        return Object.assign({}, item, {
                            InsertTime: _mm.formatDate(item.InsertTime),
                        });
                    });
                }
            },
            clickItemHandle(item) {
                let Status = parseInt(item.Status);
                let url = '';
                if (Status === 61 || Status === 68) {
                    // 未提交或者撤回，跳转到编辑页面
                    url = `/AskForLeave/Save/${item.ID}`;
                } else if (Status === 63) {
                    // 已通过，跳转到查看页面
                    url = `/AskForLeave/PersonAskForLeaveView/${item.ID}`;
                } else {
                    url = `/AskForLeave/PersonAskForLeaveSubmit/${item.ID}`;
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
                        YYear: _bizUtil.SplitDateToArr(this.currentDateStr).YYear,
                    }
                };
                this.GetAskForLeaveList(condition).then(() => {});
            },
            onLoad() {
                this.$refs.AskForLeaveList.queryHandler();
            },
            changeDateHandle(val) {
                this.currentDateStr = _mm.formatYear(val);
                this.onLoad(); // 重新请求数据
            },
        },
        mounted() {
            this.onLoad();
        }
    }
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
    #AskForLeaveListBox {}
</style>
