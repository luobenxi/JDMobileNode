<template lang="html">
    <div class="JdContactsUserListBox">
        <div class="list" v-if="itemList.length">
            <ul class="list_user" ref="listUser">
                <li v-for="item in itemList" :key="item.firstLetter">
                    <p>{{item.firstLetter}}</p>
                    <van-cell v-for="user in item.itemList" :key="user.ID" @click="clickItemUser(user)" class="user-item">
                        <van-row type="flex">
                            <img src="../../../../static/images/user-head.png" alt="">
                            <van-col span="6" offset="1" class="name">
                                {{user.FullName}}
                            </van-col>
                        </van-row>
                    </van-cell>
                </li>
            </ul>
            <ul class="list_index" ref="listIndex">
                <li @touchstart="setScroll" v-for="item in userIndexList">{{item}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import MUtil from '../../../util/mm.js';
    const _mm = new MUtil();

    // 未使用

    export default {
        name: 'JdMyContactsUserList',
        props: {
            itemList: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            userIndexList: function () {
                return this.filterIndex(this.itemList);
            },
        },
        methods: {
            filterIndex(data) {
                let result = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].firstLetter) {
                        result.push(data[i].firstLetter);
                    }
                }
                return result;
            },
            setScroll(ev) {
                let ap = this.$refs.listUser.getElementsByTagName('p');
                let addCount = 46;
                for (let i = 0; i < ap.length; i++) {
                    if (ap[i].innerHTML === ev.target.innerHTML) {
                        document.body.scrollTop = ap[i].offsetTop  + addCount;
                        document.documentElement.scrollTop = ap[i].offsetTop + addCount;
                        window.scrollTop = ap[i].offsetTop + addCount;
                    }
                }
            },
            clickItemUser(item) {
                _mm.successTips(item.FullName);
            },
            setListIndexPos() {
                if (this.$refs.listIndex !== undefined) {
                    let iH = this.$refs.listIndex.offsetHeight;
                    this.$refs.listIndex.style.marginTop = - iH / 2 + 'px';
                }
            },
        },
        mounted() {
            if (this.itemList.length) {
                this.setListIndexPos();
            }
        }
    };
</script>

<style lang="less" scroped>
    @import "../../../style/components/biz/contacts/list";
</style>
