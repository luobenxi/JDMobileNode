<template>
    <div class="contacts-box">
        <JdHeader title="积大集团通讯录" :leftArrow="false"></JdHeader>
        <van-tabs v-model="active" @click="tabClick">
            <van-tab v-for="item in tabOptions" :title="item.Title" :key="item.ID"></van-tab>
        </van-tabs>
        <JdContactsDeptList :itemList="itemList" @clickCallBack="clickRowItem"></JdContactsDeptList>
        <van-loading class="loading-box" type="spinner" v-if="loading" color="#909399"/>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import header from '../../components/common/header';
    import comContacts from '../../components/biz/contacts/dept-list';
    import MUtil from '../../util/mm.js';
    import tabOptions from './tabOptions';

    const _mm = new MUtil();

    export default {
        data() {
            return {
                loading: true,
                active: 0,
                itemList: [],
                tabOptions: tabOptions,
            }
        },
        computed: {
            ...mapGetters([
            ]),
        },
        methods: {
            ...mapActions([
                'GetDepartTreeByParentID',
            ]),
            tabClick(val) {
                let currentRow = this.tabOptions.filter((item) => {
                    return item.Index === val;
                });
                if (currentRow !== null) {
                    let ID = currentRow[0].ID;
                    _mm.setStorage('contactsActive', val); // 把active存入localStorage
                    this.itemList = [];
                    this.loading = true;
                    this.GetDepartTreeByParentID(ID).then((res) => {
                        this.loading = false;
                        this.itemList = res.itemList || [];
                    });
                }
            },
            clickRowItem(item) {
                if (item && item.ID) {
                    this.$router.push(`/contacts-user/${item.ID}`);
                } else {
                    _mm.errorTips('参数为空');
                }
            }
        },
        components: {
            [header.name]: header,
            [comContacts.name]: comContacts,
        },
        mounted() {
            let contactsActive = _mm.getStorage('contactsActive');
            contactsActive = contactsActive ? contactsActive : 0;
            this.active = parseInt(contactsActive);
            this.tabClick(this.active);
        }
    };
</script>

<style lang="less">
    @import "../../style/common/common";
</style>
