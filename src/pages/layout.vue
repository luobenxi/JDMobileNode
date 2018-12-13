<template>
    <div id="jd-layout">
        <router-view></router-view>
        <jd-footer :todoCount="todoCount"></jd-footer>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import footer from '../components/common/footer';
    import MUtil from '../util/mm';
    import BizUtil from '../util/bizUtil';

    const _mm = new MUtil();
    const _bizUtil = new BizUtil();

    export default {
        name: 'JdLayout',
        data() {
            return {
                todoCount: 0
            }
        },
        methods: {
            ...mapActions([
                'GetHRWorks',
                'GetUserTasks',
                'GetBMTask', // 雷宝清的 API
                'SetTodoCategoryList',
                'SetDoneCategoryList',
            ]),
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
                            this.SetTodoCategoryList(categoryArr); // 设置getter
                            this.todoCount = count; // total累计之和
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
                            this.SetDoneCategoryList(categoryArr); // 设置getter
                        });
                    });
                });
            },
        },
        components: {
            [footer.name]: footer,
        },
        mounted() {
            _bizUtil.checkIsLogin();
            let Cookie = _mm.getCookie(_mm.CookieKeys_UserInfo());
            // 判断是否登录
            if (Cookie) {
                // 初始化 待办/已办 事项数据
                this.getTodoListHandle(0); // 待办事项
                this.getDoneListHandle(1); // 已办事项
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../style/pages/layout.less";
</style>
