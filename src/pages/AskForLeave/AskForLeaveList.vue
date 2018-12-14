<template>
    <div id="AskForLeaveListBox">
        <jd-header title="我的请假单" :backUrl="backUrl"></jd-header>
        <van-cell>
            <van-row gutter="10" type="flex" justify="space-between">
                <van-col :span="6">
                    <van-button size="small" @click="chooseDate">选择年份</van-button>
                </van-col>
                <van-col class="currentDateStrBox">
                    {{currentDateStr}}
                </van-col>
                <van-col :span="6">
                    <van-button size="small" type="primary" @click="Add">添加</van-button>
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
                    ref="AskForLeaveList"
                    :colNameMap="colNameMap"
                    :itemList="itemList"
                    :originPaging="AskForLeaveList.paging"
                    @clickCallBack="clickItemHandle"
                    @getData="getTodoList"
            >
            </jd-list>
        </van-list>
        <div v-if="!AskForLeaveList.itemList" class="empty">暂无数据</div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import header from '../../components/common/header.vue';
    import MUtil from '../../util/mm';
    import BizUtil from '../../util/bizUtil';
    import list from '../../components/common/list';
    import JdDatetimePicker from '../../components/common/datetimePicker';
    import AjaxUtil from '../../axios/index';

    const _mm = new MUtil();
    const _bizUtil = new BizUtil();
    const ajax = new AjaxUtil();

    export default {
        data () {
            return {
                backUrl: _mm.GetEmployeeSelfHelpUrl(),
                currentDateStr: _mm.formatYear(new Date()),
                pickerIsShow: false,
                loading: false,
                finished: false,
                colNameMap: {
                    key: 'ID',
                    colName: ['Title', 'StatusText', 'InsertTime'],
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
            [JdDatetimePicker.name]: JdDatetimePicker,
        },
        methods: {
            ...mapActions([
                'GetAskForLeaveList'
            ]),
            Add() {
                this.$router.push(`/AskForLeaveApi/Save`);
            },
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
                this.currentDateStr = _mm.formatYear(val);
                this.pickerIsShow = false;
                this.$refs.AskForLeaveList.queryHandler();
            },
            formatItemList() {
                if (this.AskForLeaveList.itemList) {
                    return this.AskForLeaveList.itemList.map((item) => {
                        return Object.assign({}, item, {
                            StatusText: _bizUtil.JDApproveStatusMap(item.Status)
                        });
                    });
                }
            },
            clickItemHandle(item) {
                let Status = parseInt(item.Status);
                let url = '';
                if (Status === 61) {
                    // 未提交，跳转到编辑页面
                    url = `/AskForLeaveApi/Save/${item.ID}`;
                } else if (Status === 62) {
                    // 审批中，跳转到审批中页面
                    url = `/AskForLeave/PersonAskForLeaveProcess/${item.ID}`;
                } else if (Status === 63) {
                    // 已通过，跳转到查看页面
                    url = `/AskForLeave/PersonAskForLeaveView/${item.ID}`;
                }
                this.$router.push(url);
            },
            getTodoList(paging) {
                this.getTodoListHandle(paging);
            },
            getTodoListHandle(paging) {
                let condition = {
                    paging: paging,
                    condition: {
                        YYear: _bizUtil.SplitDateToArr(this.currentDateStr).YYear,
                    }
                };
                this.GetAskForLeaveList(condition).then(() => {
                    this.loading = false;
                    this.finished = true;
                });
            },
            onLoad() {
                this.$refs.AskForLeaveList.queryHandler();
            },
        },
        mounted() {
        }
    }
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
    #AskForLeaveListBox {
    }
</style>
