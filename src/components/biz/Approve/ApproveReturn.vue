<template>
    <div class="ApproveBox">
        <van-popup v-model="CurrentPopupIsShow" position="bottom">
            <van-cell>
                <div class="approval-title">{{title}}</div>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col :span="6">上一步骤</van-col>
                    <van-col :span="18">
                        <van-radio-group v-model="ApproveUserID">
                            <van-radio v-for="(item, index) in ApproveStepsList" :key="index" :name="item.ID">{{item.ActiveName}}({{item.ExecPersonNames}})</van-radio>
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
                        <van-button type="danger" block @click="ApproveReturnHandle">退 回</van-button>
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
        name: "ApproveReturn",
        props: {
            title: {
                type: String,
                default: () => '退回到之前步骤'
            },
            popupIsShow: {
                type: Boolean,
                default: () => false
            },
            ParamID: {
                type: Object,
                default: () => {}
            },
            ApproveStepsList: {
                type: Array,
                default: () => [
                    {
                        ID: '1', // 步骤ID
                        ActiveName: '分管副总确认',
                        ExecPersonNames: '罗冬梅'
                    },
                    {
                        ID: '2',
                        ActiveName: '信息部部门经理',
                        ExecPersonNames: '杨云江'
                    }
                ]
            },
        },
        data() {
            return {
                CurrentPopupIsShow: false,
                ApproveUserID: '',
                ApproveFrom: {
                    Result: ''
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
                'ApproveReturnPost'
            ]),
            ApproveReturnHandle() {
                if (!this.ParamID.wfDetailId) {
                    _mm.errorDialog('参数错误，请联系管理员');
                    return;
                }
                if (!this.ApproveUserID) {
                    _mm.errorDialog('请选择退回步骤');
                    return;
                }
                if (!this.ApproveFrom.Result) {
                    _mm.errorDialog('请输入退回原因');
                    return;
                }
                _mm.confirmDialog('你确定要退回请假单吗？', () => {
                    this.PageApproveReturn();
                }, true);
            },
            PageApproveReturn() {
                let data = {
                    ID: this.ParamID.wfDetailId,
                    remark: this.ApproveFrom.Result,
                    detailId: this.ApproveUserID // 步骤ID
                };
                this.ApproveReturnPost(data).then((res) => {
                    this.CurrentPopupIsShow = false;
                    _mm.confirmDialog(res.msg, () => {
                        this.$emit('successOperation');
                    });
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../style/common/common";
    @import "../../../style/components/biz/Approve/ApproveCommon";
</style>
