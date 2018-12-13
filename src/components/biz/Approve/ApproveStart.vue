<template>
    <div class="ApproveBox">
        <van-popup v-model="CurrentPopupIsShow" position="bottom">
            <van-cell>
                <div class="approval-title">{{title}}</div>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col :span="6">下一步骤</van-col>
                    <van-col :span="18">
                        <van-radio-group v-model="ApproveUserID" disabled>
                            <van-radio v-for="(item, index) in ApproveStepsList" :key="index" :name="item.ID">{{item.FullName}}</van-radio>
                        </van-radio-group>
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col :span="24">
                        <van-button type="primary" block @click="ApproveStartHandle">提 交</van-button>
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell></van-cell>
        </van-popup>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    import MUtil from '../../../util/mm';
    const _mm = new MUtil();
    export default {
        name: "ApproveStart",
        props: {
            title: {
                type: String,
                default: () => '提交审批'
            },
            popupIsShow: {
                type: Boolean,
                default: () => false
            },
            model: {
                type: Object,
                default: () => {}
            },
            ParamID: {
                type: Object,
                default: () => {}
            },
            ApproveStepsList: {
                type: Array,
                default: () => [
                    {
                        ID: '1',
                        FullName: 'xxx'
                    }
                ]
            },
            // 提交成功跳转URL
            submitSuccessJumpUrl: {
                type: String,
                default: () => ''
            },
        },
        data() {
            return {
                CurrentPopupIsShow: false,
            }
        },
        computed: {
            ApproveUserID() {
                return this.ApproveStepsList.length ? this.ApproveStepsList[0].ID : '';
            }
        },
        watch: {
            popupIsShow() {
                this.CurrentPopupIsShow = true;
            },
        },
        methods: {
            ...mapActions([
                'ApproveStart',
            ]),
            ApproveStartHandle() {
                let data = Object.assign({}, this.ParamID, {
                    KeyID: this.model.ID,
                    WorkTitle: this.model.Title,
                    UserID: this.ApproveUserID,
                    IsReSubmit: 'false',
                });
                this.ApproveStart(data).then(res => {
                    _mm.confirmDialog(res.msg, () => {
                        if (this.submitSuccessJumpUrl) {
                            this.$router.push(this.submitSuccessJumpUrl);
                        } else {
                            this.$router.go(0); // 刷新当前页面
                        }
                    });
                }).catch(err => {
                    _mm.errorDialog(err.msg);
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../style/common/common";
    @import "../../../style/components/biz/Approve/ApproveCommon";
</style>
