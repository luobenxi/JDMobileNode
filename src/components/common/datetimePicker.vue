<template>
    <div class="datetimePickerBox">
        <van-row>
            <van-col :span="24">
                <van-datetime-picker
                    v-model="currentDate"
                    :type="type"
                    :formatter="formatter"
                    @cancel="onCancel" @confirm="onConfirm"
                />
            </van-col>
        </van-row>
    </div>
</template>

<script>
    // 不带弹出层的时间选择组件
    export default {
        name: "JdDatetimePicker",
        props: {
            type: {
                type: String,
                default: () => 'year-month'
            }
        },
        data() {
            return {
                currentDate: new Date(),
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
        }
    }
</script>

<style lang="less" scoped>
</style>
