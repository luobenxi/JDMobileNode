<template>
    <div class="datetimePickerBox">
        <van-cell>
            <van-row gutter="10" class="cell-row">
                <van-col :span="6">
                    <van-button size="small" @click="chooseDate">选择时间</van-button>
                </van-col>
                <van-col class="currentDateStrBox" :span="13">
                    <div>
                        <van-icon name="arrow-left" @click="AddOrReduce(-1)"></van-icon>
                    </div>
                    <div>{{currentDateStr}}</div>
                    <div>
                        <van-icon name="arrow" @click="AddOrReduce(1)"></van-icon>
                    </div>
                </van-col>
                <van-col :span="5">
                    <!--插入右上角的按钮-->
                    <slot name="rightTopBtn"></slot>
                </van-col>
            </van-row>
        </van-cell>
        <van-popup v-model="pickerIsShow" position="bottom" :overlay="true" @click-overlay="clickOverlay">
            <JdDatetimePicker
                @onCancel="onCancel"
                @onConfirm="onConfirm"
                :type="type"
            >
            </JdDatetimePicker>
        </van-popup>
    </div>
</template>

<script>
    import JdDatetimePicker from './datetimePicker';
    import MUtil from '../../util/mm';

    const _mm = new MUtil();

    // 带弹出层的时间选择组件，可切换（加减）月份
    export default {
        name: "JdDatetimePickerSwitch",
        props: {
            type: {
                type: String,
                default: () => 'year-month'
            },
            // 切换类型
            switchType: {
                type: String,
                default: () => 'month' // year,month,day (年,月,日)
            },
            // 默认时间
            showDate: {
                type: String,
                default: () => ''
            }
        },
        data() {
            return {
                pickerIsShow: false,
                currentDateStr: this.getShowDate(this.showDate),
            }
        },
        components: {
            [JdDatetimePicker.name]: JdDatetimePicker,
        },
        watch: {
            showDate(val) {
                this.currentDateStr = val;
            }
        },
        methods: {
            chooseDate() {
                this.pickerIsShow = true;
            },
            clickOverlay() {
                this.pickerIsShow = false;
            },
            onCancel() {
                this.pickerIsShow = false;
            },
            onConfirm(val) {
                this.pickerIsShow = false;
                this.currentDateStr = this.getShowDate(val);
                this.emitData(val);
            },
            AddOrReduce(num) {
                let val = '';
                switch (this.switchType) {
                    case 'year':
                        val = _mm.addDateYear(this.currentDateStr, num);
                        break;
                    case 'month':
                        val = _mm.addDateMonth(this.currentDateStr, num);
                        break;
                    case 'day':
                        val = _mm.addDateDay(this.currentDateStr, num);
                        break;
                    default :
                        val = '';
                }
                this.currentDateStr = this.getShowDate(val);
                this.emitData(val);
            },
            getShowDate(date) {
                let val = '';
                date = typeof date === 'string' ? new Date(date) : date;
                switch (this.switchType) {
                    case 'year':
                        val = _mm.formatYear(date);
                        break;
                    case 'month':
                        val = _mm.formatMonth(date);
                        break;
                    case 'day':
                        val = _mm.formatDate(date);
                        break;
                    default :
                        val = '';
                }
                return val;
            },
            emitData(val) {
                this.$emit('changeDate', val);
            }
        }
    }
</script>

<style lang="less" scoped>
    .datetimePickerBox {
        .cell-row {
            display: flex;
            align-items: center;
        }
        .currentDateStrBox {
            display: flex;
            justify-content: space-around;
        }
    }
</style>
