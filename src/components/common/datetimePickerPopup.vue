<template>
    <div class="datetimePickerBox">
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
    // 带弹出层的时间选择组件
    export default {
        name: "JdDatetimePickerPopup",
        props: {
            type: {
                type: String,
                default: () => 'year-month'
            },
            popupIsShow: {
                type: Boolean,
                default: () => false
            }
        },
        data() {
            return {
                pickerIsShow: false,
            }
        },
        components: {
            [JdDatetimePicker.name]: JdDatetimePicker,
        },
        watch: {
            popupIsShow() {
                this.pickerIsShow = true;
            }
        },
        methods: {
            clickOverlay() {
                this.pickerIsShow = false;
            },
            onCancel() {
                this.pickerIsShow = false;
            },
            onConfirm(val) {
                this.pickerIsShow = false;
                this.$emit('onConfirm', val);
            }
        }
    }
</script>

<style lang="less" scoped>
</style>
