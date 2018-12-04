<template>
    <div id="home-box">
        <jd-swipe :swipeList="swipeList"></jd-swipe>
        <jd-menu :menuList="menuList"></jd-menu>
        <jd-news v-if="false" :newsList="newsList"></jd-news>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import swipe from '../../components/biz/home/swipe';
import menu from '../../components/biz/home/menu';
import news from '../../components/biz/home/news';
export default {
    name: 'home',
    data () {
        return {
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
            newsList: [
                {
                    id: 1,
                    title: '撒欢地阿斯哈覅搜房'
                },
                {
                    id: 2,
                    title: '撒欢地阿斯搜房省兜兜'
                },
                {
                    id: 3,
                    title: '撒欢地阿斯哈覅搜房是失该的归试欢地阿...'
                }
            ]
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
            'GetMyAuthList'
        ]),
    },
    mounted() {
        this.GetMyAuthList();
    }
}
</script>

<style lang="less" scoped>
    #home-box {
    }
</style>
