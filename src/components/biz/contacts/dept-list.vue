<template>
    <div id="JdContactsDeptList">
        <van-cell-group v-if="itemList && itemList.length">
            <van-cell v-for="item in itemList" :key="item.ID" @click="itemClickHandle(item)" is-link>
                <div style="display: flex;">
                    <span>{{item.DepartName}}</span>
                </div>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: 'JdContactsDeptList',
        data () {
            return {
            }
        },
        props: {
            itemList: {
                type: Array,
                default: () => []
            },
        },
        methods: {
            itemClickHandle(item) {
                this.$emit('clickCallBack', item);
            },
        },
    }
</script>

<style lang="less" scoped>
</style>
