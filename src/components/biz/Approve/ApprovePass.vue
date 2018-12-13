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
                        <van-radio-group v-model="ApproveUserID">
                            <van-radio v-for="(item, index) in ApproveStepsList" :key="index" :name="item.ID">{{item.FullName}}</van-radio>
                        </van-radio-group>
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell-group>
                <van-field v-model="ApproveFrom.Result" label="审批意见" type="textarea" placeholder="请输入审批意见" rows="4" autosize />
            </van-cell-group>
            <van-cell>
                <van-row>
                    <van-col :span="24">
                        <van-button type="primary" block @click="ApprovePassHandle">同 意</van-button>
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
        name: "ApprovePass",
        props: {
            title: {
                type: String,
                default: () => '通过审批'
            },
            popupIsShow: {
                type: Boolean,
                default: () => false
            },
            ApproveStepsList: {
                type: Array,
                default: () => [
                    {
                        ID: '1',
                        FullName: '罗冬梅'
                    },
                    {
                        ID: '2',
                        FullName: '王婷'
                    }
                ]
            },
            ParamID: {
                type: Object,
                default: () => {}
            },
        },
        data() {
            return {
                ApproveUserID: '',
                CurrentPopupIsShow: false,
                ApproveFrom: {
                    Result: '同意'
                },
            }
        },
        watch: {
            popupIsShow() {
                this.CurrentPopupIsShow = true;
            },
            ApproveStepsList() {
                this.ApproveUserID = this.ApproveStepsList.length ? this.ApproveStepsList[0].ID : '';
            }
        },
        methods: {
            ...mapActions([
                'ApprovePassPost',
            ]),
            ApprovePassHandle() {
                let data = Object.assign({}, this.ParamID, {
                    UserID: this.ApproveUserID,
                    remark: this.ApproveFrom.Result,
                    operatorType: ''
                });
                this.ApprovePassPost(data).then(res => {
                    _mm.confirmDialog(res.msg, () => {
                        this.$router.go(0); // 刷新当前页面
                    });
                }).catch(err => {
                    _mm.errorDialog(err.msg);
                });
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../style/common/common";
    @import "../../../style/components/biz/Approve/ApproveCommon";
</style>
