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
                            <van-radio v-for="(item, index) in ApproveStepsList" :key="index" :name="item.UserID">{{item.DepartName}}({{item.FullName}})</van-radio>
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
                        <van-button type="danger" :disabled="IsLoading" block @click="ApproveReturnHandle">退 回</van-button>
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
                        DepartName: '信息部部门经理',
                        FullName: '杨云江'
                    }
                ]
            },
        },
        data() {
            return {
                IsLoading: false,
                CurrentPopupIsShow: false,
                ApproveUserID: '1',
                ApproveFrom: {
                    Result: '退回'
                },
            }
        },
        watch: {
            popupIsShow() {
                this.CurrentPopupIsShow = true;
            }
        },
        methods: {
            ApproveReturnHandle() {
                console.log('审批退回');
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
