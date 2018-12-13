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
                        <van-button type="danger" :disabled="IsLoading" block @click="ApproveRefuseHandle">拒 绝</van-button>
                        <van-loading class="loading-box" v-if="IsLoading" color="#909399"/>
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell></van-cell>
        </van-popup>
    </div>
</template>

<script>
    export default {
        name: "ApproveRefuse",
        props: {
            title: {
                type: String,
                default: () => '拒绝并结束审批'
            },
            popupIsShow: {
                type: Boolean,
                default: () => false
            },
            ApproveStepsList: {
                type: Array,
                default: () => [
                    {
                        UserID: '1',
                        DepartName: '分管副总确认',
                        FullName: '罗冬梅'
                    },
                    {
                        UserID: '2',
                        DepartName: '人资部考勤人员确认',
                        FullName: '王婷'
                    }
                ]
            },
        },
        data() {
            return {
                IsLoading: false,
                CurrentPopupIsShow: false,
                ApproveFrom: {
                    Result: '拒绝'
                },
            }
        },
        watch: {
            popupIsShow() {
                this.CurrentPopupIsShow = true;
            }
        },
        methods: {
            ApproveRefuseHandle() {
                console.log('审批拒绝');
                this.IsLoading = true;
                setTimeout(() => {
                    this.IsLoading = false;
                }, 2000);
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../style/common/common";
    @import "../../../style/components/biz/Approve/ApproveCommon";
</style>
