<template>
    <div>
        <van-popup v-model="pagePopupIsShow" position="bottom" :overlay="true">
            <van-cell class="popup-header-row">
                <van-row type="flex" justify="space-between" class="operationText">
                    <van-col>
                        <span>取消</span>
                    </van-col>
                    <van-col>
                        <span @click="confirm">确认</span>
                    </van-col>
                </van-row>
            </van-cell>
            <slot></slot>
            <van-cell>
                <van-row type="flex" style="align-items: center">
                    <van-col :span="6">开始日期</van-col>
                    <van-col :span="18">
                        <van-button size="small" v-if="!beginDate" @click="chooseDate(1)">选择时间</van-button>
                        <span v-else>{{beginDate}}</span>
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" style="align-items: center">
                    <van-col :span="6">结束日期</van-col>
                    <van-col :span="18">
                        <van-button size="small" v-if="!endDate" @click="chooseDate(2)">选择时间</van-button>
                        <span>{{endDate}}</span>
                    </van-col>
                </van-row>
            </van-cell>
        </van-popup>
        <JdDatetimePickerPopup :popupIsShow="datePopupIsShow" type="date" @onConfirm="onConfirm"></JdDatetimePickerPopup>
    </div>
</template>

<script>
    import JdDatetimePickerPopup from './datetimePickerPopup';
    import MUtil from '../../util/mm';
    const _mm = new MUtil();
    export default {
        // 时间范围选择器
        name: 'JdBetweenDatePopup',
        props: {
            popupIsShow: {
                type: Boolean,
                default: () => false
            }
        },
        data() {
            return {
                pagePopupIsShow: false,
                type: 1, // 1=开始时间，2=结束时间
                beginDate: '',
                endDate: '',
                datePopupIsShow: false,
            };
        },
        components: {
            [JdDatetimePickerPopup.name]: JdDatetimePickerPopup,
        },
        watch: {
            popupIsShow() {
                this.pagePopupIsShow = true;
            }
        },
        computed: {
        },
        methods: {
            // 确认
            onConfirm(val) {
                let dateStr = _mm.formatDate(val);
                if (this.type === 1) {
                    this.beginDate = dateStr
                } else {
                    this.endDate = dateStr;
                }
            },
            chooseDate(type) {
                this.type = type;
                this.datePopupIsShow = !this.datePopupIsShow;
            },
            confirm() {
                let val = {
                    beginDate: this.beginDate,
                    endDate: this.endDate,
                };
                this.beginDate = '';
                this.endDate = '';
                this.$emit('onConfirm', val);
                this.pagePopupIsShow = false;
            },
        },
        mounted() {
        }
    };
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
</style>
