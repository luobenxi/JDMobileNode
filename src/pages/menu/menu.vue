<template>
    <div id="menu-box">
        <jd-header title="二级菜单" backUrl="/"></jd-header>
        <jd-menu :menuList="menuList"></jd-menu>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import header from '../../components/common/header.vue';
import menu from '../../components/biz/home/menu';
export default {
    name: 'sub-menu',
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'MyAuthList',
        ]),
        menuList() {
            return this.MyAuthList || [];
        }
    },
    components: {
        [header.name]: header,
        [menu.name]: menu,
    },
    methods: {
        ...mapActions([
            'GetMyAuthList'
        ]),
    },
    mounted() {
        let ParentID = this.$route.params.ParentID;
        this.GetMyAuthList(ParentID);
    }
}
</script>

<style lang="less" scoped>
    #menu-box {
    }
</style>
