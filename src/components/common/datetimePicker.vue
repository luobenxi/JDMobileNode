<template>
    <div class="datetimePickerBox">
        <van-row>
            <van-col :span="24">
                <van-datetime-picker
                    v-model="currentDate"
                    :type="type"
                    @cancel="onCancel"
                    @confirm="onConfirm"
                />
            </van-col>
        </van-row>
    </div>
</template>

<script>
    import MUtil from '../../util/mm';
    const _mm = new MUtil();
    // 不带弹出层的时间选择组件
    export default {
        name: "JdDatetimePicker",
        props: {
            type: {
                type: String,
                default: () => 'year-month'
            },
            defaultDate: {
                type: String,
                default: () => ''
            }
        },
        data() {
            return {
                currentDate: new Date(),
            }
        },
        watch: {
            defaultDate(val) {
                if (val) {
                    this.currentDate = new Date(val);
                }
            }
        },
        methods: {
            onCancel() {
                this.$emit('onCancel', this.currentDate);
            },
            onConfirm() {
                this.$emit('onConfirm', this.currentDate);
            },
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                }
                return value;
            }
        },
        mounted() {
            if (this.defaultDate) {
                this.currentDate = new Date(this.defaultDate);
            }
        }
    }
</script>

<style lang="less" scoped>
</style>
