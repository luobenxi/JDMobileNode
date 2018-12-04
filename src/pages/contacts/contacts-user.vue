<template>
    <div class="contacts-child-box">
        <JdHeader :title="DepartName"></JdHeader>
        <JdSearch placeholder="请输入姓名进行查询" @getData="getKeyWordData"></JdSearch>
        <JdContactsUserList v-if="!loading" :itemList="userList"></JdContactsUserList>
        <van-loading class="loading-box" type="spinner" v-if="loading" color="#909399"/>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import header from '../../components/common/header';
    import search from '../../components/common/search';
    import contactsUser from '../../components/biz/contacts/user-list';
    import MUtil from '../../util/mm.js';

    const _mm = new MUtil();

    export default {
        data() {
            return {
                loading: true,
                DepartID: '',
                FullName: '',
                DepartName: '',
                userList: [],
            }
        },
        computed: {
            ...mapGetters([
            ]),
        },
        methods: {
            ...mapActions([
                'GetDepartTreeByParentID',
                'GetUserListByDepartID',
            ]),
            getKeyWordData(val) {
                this.FullName = val;
                this.InitParams();
            },
            InitParams() {
                let params = this.$route.params;
                this.DepartID = params.DepartID; // 地址栏参数
                this.GetUserListByDeptID(params.DepartID);
            },
            GetUserListByDeptID(DepartID) {
                let data = {
                    DepartID: DepartID,
                    FullName: this.FullName,
                };
                this.loading = true; // 开始加载
                // 获取用户列表
                this.GetUserListByDepartID(data).then((res) => {
                    this.userList = res.map((item) => {
                        return Object.assign({}, item, {
                            Photo: item.Photo ? item.Photo : '../../../../static/images/user-head.png'
                        })
                    });
                    this.loading = false; // 停止加载
                    if (this.FullName === '') {
                        // 未按照姓名查询，按部门ID查询用户列表
                        this.GetDepartTreeByPID(DepartID);
                    } else {
                        // 按姓名模糊查询
                        this.DepartName = this.FullName + '(' + this.userList.length + ')' ;
                    }
                });
            },
            GetDepartTreeByPID(ParentID) {
                this.GetDepartTreeByParentID(ParentID).then((res) => {
                    this.DepartName = res.CurrentDepart ? res.CurrentDepart.DepartName + '(' + this.userList.length + ')' || '' : '';
                });
            },
        },
        components: {
            [header.name]: header,
            [search.name]: search,
            [contactsUser.name]: contactsUser,
        },
        mounted() {
            this.InitParams();
        }
    };
</script>

<style lang="less">
    @import "../../style/common/common";
</style>
