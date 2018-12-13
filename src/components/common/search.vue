<template>
    <div id="jd-search">
        <van-field v-model="keyword" :icon="inputIcon" @click-icon="clickIconClear" :placeholder="placeholder" />
        <van-button class="btn" :type="btnType" size="small" @click="SearchHandle">{{btnText}}</van-button>
    </div>
</template>

<script>
    export default {
        name: 'JdSearch',
        props: {
            placeholder: {
                type: String,
                default: () => '请输入关键字进行搜索'
            },
            btnType: {
                type: String,
                default: () => 'primary'
            },
            btnText: {
                type: String,
                default: () => '搜 索'
            }
        },
        data() {
            return {
                keyword: ''
            };
        },
        computed: {
            inputIcon() {
                return this.keyword !== '' ? 'clear' : '';
            }
        },
        methods: {
            clickIconClear() {
                this.keyword = '';
            },
            SearchHandle() {
                this.$emit('getData', this.keyword);
            }
        },
    };
</script>

<style lang="less" scoped>
    @import "../../style/components/common/search";
</style>
