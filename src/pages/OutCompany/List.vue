<template>
    <div id="OutCompanyList-box">
        <jd-header title="我的公出备案单" :backUrl="backUrl"></jd-header>
        <JdDatetimePickerSwitch :showDate="currentDateStr" switchType="year" @changeDate="changeDateHandle">
            <van-button size="small" slot="rightTopBtn" type="primary" @click="Add">添加</van-button>
        </JdDatetimePickerSwitch>
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
                 @getData="getList"
            >
                <template slot="handlerColumn" slot-scope="scope">
                    <JdStatusTextMap :Status="scope.item.Status"></JdStatusTextMap>
                </template>
            </jd-list>
        </van-list>
        <div v-if="!OutCompanyList.itemList" class="empty">暂无数据</div>
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
            loading: false,
            finished: false,
            colNameMap: {
                key: 'ID',
                colName: ['Title', 'InsertTime']
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
        [statusTextMap.name]: statusTextMap,
        [JdDatetimePickerSwitch.name]: JdDatetimePickerSwitch,
    },
    methods: {
        ...mapActions([
            'GetOutCompanyList'
        ]),
        Add() {
            this.$router.push(`/OutCompanyApi/Save`);
        },
        changeDateHandle(val) {
            this.currentDateStr = _mm.formatYear(val);
            this.onLoad(); // 重新请求数据
        },
        formatItemList() {
            if (this.OutCompanyList.itemList) {
                return this.OutCompanyList.itemList.map(item => {
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
                url = `/OutCompanyApi/Save/${item.ID}`;
            } else {
                // 跳转到查看页面
                url = `/OutCompanyApi/View/${item.ID}`;
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
