<template>
    <div class="ApproveBox">
        <van-popup v-model="CurrentPopupIsShow" position="bottom">
            <van-cell>
                <div class="approval-title">{{title}}</div>
            </van-cell>
            <van-cell-group>
                <van-field v-model="ApproveFrom.Result" label="撤回原因" type="textarea" placeholder="请输入撤回原因" rows="4" autosize />
            </van-cell-group>
            <van-cell>
                <van-row>
                    <van-col :span="24">
                        <van-button type="danger" block @click="ApproveWithDrawHandle">撤 回</van-button>
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
        name: "ApproveWithDraw",
        props: {
            title: {
                type: String,
                default: () => '审批撤回'
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
                    Result: ''
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
                'ApproveWithDraw',
            ]),
            ApproveWithDrawHandle() {
                if (!this.ApproveFrom.Result) {
                    _mm.errorDialog('请输入撤回原因');
                    return;
                }
                _mm.confirmDialog('你确定要撤回请假单吗？', () => {
                    this.PageApproveWithDraw();
                }, true);
            },
            PageApproveWithDraw() {
                let data = {
                    ID: this.ParamID.ID,
                    remark: this.ApproveFrom.Result
                };
                if (!data.ID) {
                    _mm.errorDialog('参数为空，请联系管理员');
                    return;
                }
                this.ApproveWithDraw(data).then((res) => {
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
