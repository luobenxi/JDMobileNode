<template>
    <div class="AskForLeave-box">
        <jd-header title="请假申请" :backUrl="backUrl"></jd-header>
        <van-cell>
            <van-row gutter="10" type="flex" justify="space-between">
                <van-col :span="6">
                    <van-button size="small" type="primary" @click="Add">添加</van-button>
                </van-col>
            </van-row>
        </van-cell>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import header from '../../components/common/header.vue';
    import MUtil from '../../util/mm';

    const _mm = new MUtil();

    export default {
        name: 'AskForLeave',
        data () {
            return {
                backUrl: _mm.GetEmployeeSelfHelpUrl(),
            }
        },
        components: {
            [header.name]: header
        },
        computed: {
            ...mapGetters([
            ]),
        },
        methods: {
            ...mapActions([
            ]),
            Add() {
                this.$router.push(`/AskForLeaveApi/Add`);
            }
        },
        mounted() {
        }
    }
</script>

<style lang="less" scoped>
    #AskForLeave-box {
    }
</style>
