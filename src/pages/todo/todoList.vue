<template>
    <div id="todo-box">
        <jd-header :title="CategoryName"></jd-header>
        <van-tabs v-model="active" @click="tabClick">
            <van-tab title="待办"></van-tab>
            <van-tab title="已办"></van-tab>
        </van-tabs>
        <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad">
            <jd-list
                 ref="TaskList"
                 :colNameMap="colNameMap"
                 :itemList="itemList"
                 :rightText="doText"
                 :isShowPaging="false"
                 @clickCallBack="clickHandle"
                 @getData="getTaskList"
            ></jd-list>
        </van-list>
        <div class="sub-btn">
            <van-button type="primary" class="btn-item" plain block @click="ShowAllPage">查看全部</van-button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MUtil from '../../util/mm.js';
import header from '../../components/common/header';
import list from '../../components/common/list';

const _mm = new MUtil();

export default {
    name: 'todo',
    data () {
        return {
            CategoryName: '',
            ListPageUrl: '',
            active: 0,
            loading: false,
            finished: false,
            colNameMap: {
                key: 'ID',
                colName: ['TaskTitle']
            }
        }
    },
    computed: {
        ...mapGetters([
            'todoCategoryList',
            'doneCategoryList',
            'TaskList',
        ]),
        doText() {
            return this.active === 0 ? '处理' : '查看';
        },
        itemList() {
            return this.itemListFormat();
        }
    },
    components: {
        [header.name]: header,
        [list.name]: list,
    },
    methods: {
        ...mapActions([
            'SetTaskList',
        ]),
        ShowAllPage() {
            if (this.ListPageUrl) {
                window.open(this.ListPageUrl);
            }
        },
        itemListFormat() {
            let showTextLength = 20;
            return this.TaskList.map((item) => {
                return Object.assign({}, item, {
                    TaskTitle: item.TaskTitle.length > showTextLength ? item.TaskTitle.substring(0, showTextLength) + '...' : item.TaskTitle
                });
            });
        },
        tabClick(item) {
            this.SetTaskList([]);
            this.getTaskListHandle(item);
        },
        clickHandle(item) {
            window.open(item.TaskUrl);
        },
        getTaskList() {
            this.getTaskListHandle(this.active);
        },
        getTaskListHandle(status) {
            let currentList = [];
            if (status === 0) {
                // 待办
                currentList = this.todoCategoryList.filter((item) => {
                    return item.CategoryName === this.CategoryName;
                });
            } else if (status === 1) {
                // 已办
                currentList = this.doneCategoryList.filter((item) => {
                    return item.CategoryName === this.CategoryName;
                });
            }
            this.SetTaskList(currentList[0].itemList);
            this.ListPageUrl = currentList[0].ListPageUrl;
            this.loading = false;
            this.finished = true;
        },
        onLoad() {
            this.$refs.TaskList.queryHandler();
        },
    },
    mounted() {
        this.CategoryName = this.$route.params.CategoryName;
        this.active = parseInt(this.$route.params.active);
    }
}
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
    #todo-box {
    }
</style>
