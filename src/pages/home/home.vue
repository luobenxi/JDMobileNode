<template>
    <div id="home-box">
        <jd-swipe :swipeList="swipeList"></jd-swipe>
        <van-notice-bar v-if="noticeContent" mode="link" @click="noticeDetail">{{noticeContent}}</van-notice-bar>
        <jd-menu :menuList="menuList"></jd-menu>
        <van-popup v-model="popupIsShow" position="right">
            <div class="notice-box">
                <van-button size="small" @click="CloseHandle">关闭</van-button>
                <div class="notice-content">{{noticeContent}}</div>
            </div>
        </van-popup>
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
            popupIsShow: false,
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
            'GetNewNoticeInfo',
        ]),
        noticeDetail() {
            // this.popupIsShow = true;
            this.$router.push('/notice/list');
        },
        CloseHandle() {
            this.popupIsShow = false;
        }
    },
    mounted() {
        this.GetMyAuthList();
        this.GetNewNoticeInfo().then(res => {
            if (res.success) {
                this.noticeContent = res.data;
            }
        });
    }
}
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
    #home-box {
        .notice-box {
            .minHeight(180);
            .padding2(15, 7);
        }
        .notice-content {
            .paddingTop(10);
            text-indent: 30px;
            .lineHeight(25);
            .fontSize(15);
            color: #606266;
        }
    }
</style>
