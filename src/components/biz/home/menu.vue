<template lang="html">
    <div class="menu-box">
        <van-row class="menu" v-if="menuList.length" v-for="firstMenu in menuList" :key="firstMenu.ID">
            <van-col span="24" class="firstMenuTitle">{{firstMenu.DisplayName}}</van-col>
            <van-col v-for="item in firstMenu.Childs" :key="item.ID" span="6" class="menu-item">
                <div @click="menuClickHandle(item)">
                    <van-icon name="description"/>
                    <span>{{item.DisplayName}}</span>
                </div>
            </van-col>
        </van-row>
        <van-loading v-if="!menuList.length" type="spinner" class="loading-box" color="#606266"/>
    </div>
</template>

<script>
    import router from '../../../router/index';
    export default {
        name: 'JdMenu',
        props: {
            menuList: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                AllRouterList: []
            }
        },
        methods: {
            menuClickHandle(item) {
                let routesArr = this.GetAllRouterList(router.options.routes || []);
                console.log(item.AppUrl);
                if (item.Leave === '2') {
                    // 跳转到二级菜单页面
                    this.$router.push(`/sub-menu/${item.ID}`);
                } else if (item.AppUrl) {
                    // 所有移动端的AppUrl都包含 Api  item.AppUrl.indexOf('Api') === -1
                    if (routesArr.indexOf(item.AppUrl) === -1) {
                        // 路由列表里面找不到当前连接，跳转到原来的页面
                        console.log('跳转到原来的页面');
                        window.open(item.AppUrl);
                    } else {
                        // 路由到移动端的页面
                        console.log('跳转到移动端组件');
                        this.$router.push(item.AppUrl || '/');
                    }
                }
            },
            GetAllRouterList(list) {
                list.map((item) => {
                    this.AllRouterList.push(item.path);
                    if (item.children) {
                        this.GetAllRouterList(item.children);
                    }
                });
                return this.AllRouterList;
            }
        }
    };
</script>

<style lang="less" scroped>
    @import "../../../style/common/common";
    @import "../../../style/components/biz/home/menu";
</style>
