<template>
    <div class="todoCategoryBox">
        <jd-header title="选择分类"></jd-header>
        <van-col v-if="doneCategoryList.length" v-for="item in doneCategoryList" :key="item.CategoryName" span="6" class="menu-item">
            <div @click="categoryClickHandle(item)">
                <van-icon name="description"/>
                <span>{{item.CategoryName}}</span>
            </div>
        </van-col>
        <div v-if="!doneCategoryList.length" class="empty">暂无已办事项</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import header from '../../components/common/header';
import MUtil from '../../util/mm';

const _mm = new MUtil();

export default {
    name: 'todoCategory',
    data () {
        return {
            activeKey: 1,
        }
    },
    computed: {
        ...mapGetters([
            'doneCategoryList',
        ]),
    },
    components: {
        [header.name]: header
    },
    methods: {
        categoryClickHandle(item) {
            if (item.CategoryKey && item.CategoryKey === '1') {
                window.location.href = item.ListPageUrl;
                return;
            }
            this.$router.push(`/todoList/${item.CategoryName}/1`); // 1 = 已办
        }
    }
}
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
    @import "../../style/pages/todo/todoCategory";
</style>
