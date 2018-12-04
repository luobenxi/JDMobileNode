<template>
    <div class="my-box">
        <jd-header title="我的" :leftArrow="false"></jd-header>
        <van-cell-group>
            <van-cell v-for="item in currentPageMenus"
                :key="item.key"
                :icon="item.icon || 'pending-orders'"
                :title="item.displayName"
                @click="menuClickHandle(item)"
                is-link />
        </van-cell-group>
        <div class="logout-btn">
            <van-button type="danger" plain block @click="logoutHandle">退出登录</van-button>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant';
import { mapGetters } from 'vuex';
import header from '../../components/common/header';
import MUtil from '../../util/mm.js';

const _mm = new MUtil();

export default {
    name: 'my',
    data () {
        return {
        }
    },
    components: {
        [header.name]: header
    },
    computed: {
        ...mapGetters([
            'menus',
        ]),
        currentPageMenus() {
            return this.getCurrentPageMenus()
        }
    },
    methods: {
        menuClickHandle(item) {
            this.$router.push('/' + item.key || '/');
        },
        logoutHandle() {
            Dialog.confirm({
                title: '提示',
                message: '你确定要退出系统吗？'
            }).then(() => {
                // _mm.removeStorage('user.token');
                // _mm.removeStorage('user.info');
                window.location.href = _mm.GetLoginPageUrl();
            }).catch(() => {
            });
        },
        getCurrentPageMenus() {
            let temp = this.menus.filter((item) => {
                return item.key === 'my'
            });
            return temp[0] ? temp[0].subMenu : [];
        }
    },
    mounted() {
        this.getCurrentPageMenus();
    }
}
</script>

<style lang="less" scoped>
    @import "../../style/pages/my/my";
</style>
