<template>
    <div class="JdContactsUserList">
        <van-cell-group v-if="itemList && itemList.length">
            <van-cell v-for="user in itemList" :key="user.ID" @click="itemClickHandle(user)" class="user-item">
                <van-row type="flex" justify="space-between">
                    <van-col class="row">
                        <img :src="user.Photo" alt="">
                        <span class="FullName">{{user.FullName}} </span>
                        <span v-if="user.PostName">({{user.PostName}})</span>
                    </van-col>
                    <van-col>
                        {{user.DepartName}}
                    </van-col>
                </van-row>
            </van-cell>
        </van-cell-group>
        <div v-if="!itemList.length" class="empty">暂无数据</div>
        <div>
            <van-popup v-model="popupIsShow" position="bottom" :overlay="true" @click-overlay="clickOverlay">
                <div class="Photo">
                    <img v-if="currentUser.Photo" :src="currentUser.Photo" alt="用户头像">
                    <div v-else>暂无用户头像</div>
                </div>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>姓名</van-col>
                        <van-col>{{currentUser.FullName}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>部门</van-col>
                        <van-col>{{currentUser.DepartName}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>职务</van-col>
                        <van-col>{{currentUser.PostName}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>分机</van-col>
                        <van-col>{{currentUser.ExtensionNumber}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell @click="call(currentUser.Mobile)">
                    <van-row type="flex" justify="space-between">
                        <van-col>手机</van-col>
                        <van-col>{{currentUser.Mobile}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>邮箱</van-col>
                        <van-col>{{currentUser.Email}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>传真</van-col>
                        <van-col>{{currentUser.Fax}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-button class="call-btn" type="primary" block size="normal" @click="call(currentUser.Mobile)">拨打手机</van-button>
                </van-cell>
            </van-popup>
        </div>
    </div>
</template>

<script>
    import MUtil from '../../../util/mm.js';
    const _mm = new MUtil();

    export default {
        name: 'JdContactsUserList',
        data () {
            return {
                popupIsShow: false,
                currentUser: {},
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
                this.currentUser = item;
                this.popupIsShow = true;
            },
            clickOverlay() {
                this.popupIsShow = false;
            },
            call(Mobile) {
                if (Mobile) {
                    // window.location.href = `sms: ${Mobile}?body=你好，有事需要您帮忙，请查看邮件，谢谢！`; // 发送短信
                    window.location.href = `tel: ${Mobile}`; // 拨打电话
                } else {
                    _mm.errorTips('电话号码无效');
                }
            },
        },
    }
</script>

<style lang="less" scoped>
    @import "../../../style/common/common";
    @import "../../../style/components/biz/contacts/user-list";
</style>
