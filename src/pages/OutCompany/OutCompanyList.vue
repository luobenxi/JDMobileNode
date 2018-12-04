<template>
    <div id="OutCompanyList-box">
        <jd-header title="我的公出备案单" :backUrl="backUrl"></jd-header>
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
                 ref="OutCompanyList"
                 :colNameMap="colNameMap"
                 :itemList="itemList"
                 :originPaging="OutCompanyList.paging"
                 @clickCallBack="clickItemHandle"
                 @getData="getTodoList"
            >
            </jd-list>
        </van-list>
        <div v-if="!OutCompanyList.itemList" class="empty">暂无数据</div>
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
            currentDateStr: _mm.formatYear(new Date()),
            pickerIsShow: false,
            loading: false,
            finished: false,
            colNameMap: {
                key: 'ID',
                colName: ['Title', 'InsertTime'],
            }
        }
    },
    computed: {
        ...mapGetters([
            'OutCompanyList',
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
            'GetOutCompanyList'
        ]),
        Add() {
            this.$router.push(`/OutCompanyApi/Save`);
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
            this.$refs.OutCompanyList.queryHandler();
        },
        formatItemList() {
            if (this.OutCompanyList.itemList) {
                return this.OutCompanyList.itemList;
            }
        },
        clickItemHandle(item) {
            this.$router.push(`/OutCompanyApi/Save/${item.ID}`);
        },
        getTodoList(paging) {
            this.getTodoListHandle(paging);
        },
        getTodoListHandle(paging) {
            let condition = {
                paging: paging,
                condition: {
                    YYear: bizMap.SplitDateToArr(this.currentDateStr).YYear,
                }
            };
            this.GetOutCompanyList(condition).then(() => {
                this.loading = false;
                this.finished = true;
            });
        },
        onLoad() {
            this.$refs.OutCompanyList.queryHandler();
        },
    },
    mounted() {
    }
}
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
    @import "../../style/pages/OutCompany/OutCompanyList";
</style>
