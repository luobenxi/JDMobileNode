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
            ApproveWithDrawHandle() {
                console.log('审批撤回');
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../style/common/common";
    @import "../../../style/components/biz/Approve/ApproveCommon";
</style>
