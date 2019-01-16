<template>
    <div class="home-box">
        <!--轮播-->
        <jd-swipe :swipeList="swipeList"></jd-swipe>
        <!--通知-->
        <van-notice-bar v-if="noticeContent" mode="link" @click="noticeDetail">{{noticeContent}}</van-notice-bar>
        <!--菜单-->
        <jd-menu :menuList="menuList"></jd-menu>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import swipe from '../../components/biz/home/swipe';
import menu from '../../components/biz/home/menu';
import news from '../../components/biz/home/news';
import Vue from 'vue';
import { Icon } from 'vant';

Vue.use(Icon);
export default {
    name: 'home',
    data () {
        return {
            noticeContent: '',
            swipeList: [
                {
                    id: 1,
                    src: '../../../static/images/swipe/001.jpg'
                },
                {
                    id: 2,
                    src: '../../../static/images/swipe/002.jpg'
                }
            ],
        }
    },
    computed: {
        ...mapGetters([
            'MyAuthList',
            'NoticeListTop10',
        ]),
        menuList() {
            return this.MyAuthList || [];
        }
    },
    components: {
        [swipe.name]: swipe,
        [menu.name]: menu,
        [news.name]: news,
    },
    methods: {
        ...mapActions([
            'GetMyAuthList',
            'GetNoticeListTop10',
        ]),
        noticeDetail() {
            this.$router.push('/notice/list');
        },
    },
    mounted() {
        this.GetMyAuthList();
        // this.GetNoticeListTop10().then(res => {
        //     if (res.success) {
        //         this.noticeContent = this.NoticeListTop10.length ? this.NoticeListTop10[0].Title : '';
        //     }
        // });
    }
}
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
</style>
