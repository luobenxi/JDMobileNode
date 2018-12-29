<template>
    <div id="todo-box">
        <jd-header :title="CategoryName" backUrl="/todoCategory"></jd-header>
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
import router from '../../router/index';

const _mm = new MUtil();

export default {
    name: 'todo',
    data () {
        return {
            CategoryName: '',
            ListPageUrl: '',
            active: 0,
            requestCount: 0, // 请求次数
            loading: false,
            finished: false,
            colNameMap: {
                key: 'ID',
                colName: ['TaskTitle']
            },
            AllRouterList: []
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
            'GetHRWorks',
            'GetUserTasks',
            'GetBMTask', // 雷宝清的 API
            'SetTodoCategoryList',
            'SetDoneCategoryList',

            'GetWorkFlowsDoUrl',
            'GetWorkFlowsViewUrl',
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
        GetAllRouterListNoParams(list) {
            list.map((item) => {
                let tempPathArr = item.path.split('/:'); // 去掉参数部分
                this.AllRouterList.push(tempPathArr[0]);
                if (item.children) {
                    this.GetAllRouterListNoParams(item.children);
                }
            });
            return this.AllRouterList;
        },
        clickHandle(item) {
            let  wfId = _mm.getSpecialUrlParam(item.TaskUrl, 'wfId');
            let  wfDetailId = _mm.getSpecialUrlParam(item.TaskUrl, 'wfDetailId');
            let  activeId = _mm.getSpecialUrlParam(item.TaskUrl, 'activeId');
            let  keyId = _mm.getSpecialUrlParam(item.TaskUrl, 'keyId');
            if (!wfDetailId || !activeId) {
                _mm.errorDialog('参数为空');
                return false;
            }
            let data = {
                wfId,
                wfDetailId,
                activeId,
                keyId
            };
            this.AllRouterList = []; // 每次清空路由列表
            if (item.Status === '62') {
                // 流程处理
                this.GetWorkFlowsDoUrl(data).then(res => {
                    let url = res.data.split('?')[0];
                    let wfDetailId = _mm.getSpecialUrlParam(res.data, 'wfDetailId');
                    let routesArr = this.GetAllRouterListNoParams(router.options.routes || []);
                    console.log(`${url}/${wfDetailId}`);
                    if (routesArr.indexOf(url) !== -1) {
                        // 找到路由，跳转到vue页面
                        this.$router.push(`${url}/${wfDetailId}`);
                    } else {
                        // 未找到路由，跳转到原来的页面
                        // console.log('未找到路由');
                        // console.log(item.TaskUrl);
                        // window.open(item.TaskUrl);
                        window.location.href = item.TaskUrl;
                    }
                });
            } else {
                this.GetWorkFlowsViewUrl(data).then(res => {
                    // console.log(res.data);
                    // 跳转到原来的页面
                    // window.open(item.TaskUrl);
                    window.location.href = item.TaskUrl;
                });
            }
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
            if (currentList.length) {
                this.SetTaskList(currentList[0].itemList);
                this.ListPageUrl = currentList[0].ListPageUrl;
            } else {
                // 当页面刷新时，重新初始化 待办/已办 事项数据
                // 只有当 requestCount 为0时才请求，防止无限循环请求，(getter为0的情况有：1、刷新页  2、本身待办或已办记录为0)
                if (this.requestCount === 0) {
                    this.getTodoListHandle(0); // 待办事项
                    this.getDoneListHandle(1); // 已办事项
                }
            }
            this.loading = false;
            this.finished = true;
        },
        onLoad() {
            this.$refs.TaskList.queryHandler();
        },
        // 待办事项处理
        getTodoListHandle(status) {
            this.GetHRWorks(status).then((res) => {
                this.GetUserTasks(status).then((res2) => {
                    this.GetBMTask(status).then((res3) => {
                        let categoryArr = [];
                        let count = res.total + res2.total; // 待办数字累加
                        if (res.CategoryName) {
                            categoryArr.push(res);
                        }
                        if (res2.CategoryName) {
                            categoryArr.push(res2);
                        }
                        if (res3 && res3 !== null) {
                            res3.map((item) => {
                                categoryArr.push(item);
                                count = count + item.total;
                            });
                        }
                        this.requestCount++; // 请求次数累加
                        this.SetTodoCategoryList(categoryArr); // 设置getter
                        this.getTaskListHandle(this.active);
                    });
                });
            });
        },
        // 已办事项处理
        getDoneListHandle(status) {
            this.GetHRWorks(status).then((res) => {
                this.GetUserTasks(status).then((res2) => {
                    this.GetBMTask(status).then((res3) => {
                        let categoryArr = [];
                        if (res.CategoryName) {
                            categoryArr.push(res);
                        }
                        if (res2.CategoryName) {
                            categoryArr.push(res2);
                        }
                        if (res3 && res3 !== null) {
                            res3.map((item) => {
                                categoryArr.push(item);
                            });
                        }
                        this.requestCount++; // 请求次数累加
                        this.SetDoneCategoryList(categoryArr); // 设置getter
                        this.getTaskListHandle(this.active);
                    });
                });
            });
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
