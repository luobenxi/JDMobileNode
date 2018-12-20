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
                        <van-button type="danger" block @click="ApproveRefuseHandle">拒 绝</van-button>
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
            ParamID: {
                type: Object,
                default: () => {}
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
                'ApproveRefuse',
            ]),
            ApproveRefuseHandle() {
                if (!this.ApproveFrom.Result) {
                    _mm.errorDialog('请输入拒绝原因');
                    return;
                }
                _mm.confirmDialog('你确定要拒绝请假单吗？', () => {
                    this.PageApproveRefuse();
                }, true);
            },
            PageApproveRefuse() {
                let data = {
                    ID: this.ParamID.ID,
                    remark: this.ApproveFrom.Result
                };
                if (!data.ID) {
                    _mm.errorDialog('参数为空，请联系管理员');
                    return;
                }
                this.ApproveRefuse(data).then((res) => {
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
