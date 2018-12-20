<template>
    <div class="ApproveBox">
        <van-popup v-model="CurrentPopupIsShow" position="bottom">
            <van-cell>
                <div class="approval-title">{{title}}</div>
            </van-cell>
            <van-cell-group>
                <van-field v-model="ApproveFrom.Result" label="审批意见" type="textarea" placeholder="请输入审批意见" rows="4" autosize />
            </van-cell-group>
            <van-cell>
                <van-row>
                    <van-col :span="24">
                        <van-button type="primary" block @click="ApproveFinishHandle">同 意</van-button>
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
        name: "ApproveFinish",
        props: {
            title: {
                type: String,
                default: () => '通过并结束审批'
            },
            popupIsShow: {
                type: Boolean,
                default: () => false
            },
            ParamID: {
                type: Object,
                default: () => {}
            },
        },
        data() {
            return {
                CurrentPopupIsShow: false,
                ApproveFrom: {
                    Result: '同意'
                },
            }
        },
        watch: {
            popupIsShow() {
                this.CurrentPopupIsShow = true;
            }
        },
        methods: {
            ...mapActions([
                'ApproveFinish',
            ]),
            ApproveFinishHandle() {
                let data = Object.assign({}, this.ParamID, {
                    remark: this.ApproveFrom.Result,
                });
                this.ApproveFinish(data).then(res => {
                    this.CurrentPopupIsShow = false;
                    _mm.confirmDialog(res.msg, () => {
                        this.$emit('successOperation');
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
