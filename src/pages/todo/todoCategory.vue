<template>
    <div class="todoCategoryBox">
        <div v-if="todoCategoryList.length">
            <jd-header title="选择分类" :leftArrow="false"></jd-header>
            <van-col v-for="item in todoCategoryList" :key="item.CategoryName" span="6" class="menu-item">
                <div @click="categoryClickHandle(item)">
                    <van-icon name="description"/>
                    <span>{{item.CategoryName}}</span>
                </div>
                <div class="todoCount">{{item.total}}</div>
            </van-col>
        </div>
        <div v-else class="empty">暂无待办事项</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import header from '../../components/common/header';
import MUtil from '../../util/mm.js';

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
            'todoCategoryList',
        ]),
    },
    components: {
        [header.name]: header
    },
    methods: {
        categoryClickHandle(item) {
            this.$router.push(`/todoList/${item.CategoryName}/0`); // 0 = 待办
        },
    }
}
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
    @import "../../style/pages/todo/todoCategory";
</style>
