<template>
    <div class="contacts-box">
        <jd-header title="我的通讯录"></jd-header>
        <JdMyContactsUserList v-if="AllUserList.length && !loading" :itemList="AllUserList"></JdMyContactsUserList>
        <van-loading v-if="loading" type="spinner" class="loading-box" color="#606266"/>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import header from '../../components/common/header';
    import jdContacts from '../../components/biz/contacts/my-contacts-list';
    import MUtil from '../../util/mm.js';

    const _mm = new MUtil();

    // 未使用

    export default {
        data() {
            return {
                loading: true,
            }
        },
        computed: {
            ...mapGetters([
                'AllUserList',
            ]),
        },
        methods: {
            ...mapActions([
                'GetAllUerList',
            ]),
        },
        components: {
            [header.name]: header,
            [jdContacts.name]: jdContacts,
        },
        mounted() {
            let length = this.AllUserList.length || '0';
            _mm.successTips(length);
            this.loading = true;
            if (!this.AllUserList.length) {
                // 如果store里面有就不需要请求数据
                this.GetAllUerList().then(() => {
                    this.loading = false;
                });
            } else {
                this.loading = false;
            }
        }
    };
</script>

<style lang="less">
    @import "../../style/common/common";
</style>
