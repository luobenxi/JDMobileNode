<template>
    <div>
        <van-popup v-model="pagePopupIsShow" position="bottom" :overlay="true" @click-overlay="clickOverlay">
            <van-cell class="popup-header-row">
                <van-row type="flex" justify="space-between">
                    <van-col>
                        <span @click="cancel">取消</span>
                    </van-col>
                    <van-col>
                        <span @click="confirm">确认</span>
                    </van-col>
                </van-row>
            </van-cell>
            <slot></slot>
        </van-popup>
    </div>
</template>

<script>
    export default {
        name: 'JdPopup',
        props: {
            popupIsShow: {
                type: Boolean,
                default: () => false
            }
        },
        data() {
            return {
                pagePopupIsShow: false
            };
        },
        watch: {
            popupIsShow() {
                this.pagePopupIsShow = true;
            }
        },
        methods: {
            clickOverlay() {
                this.pagePopupIsShow = false;
            },
            cancel() {
                this.pagePopupIsShow = false;
            },
            confirm() {
                this.$emit('onConfirm', false);
                this.pagePopupIsShow = false;
            }
        }
    };
</script>

<style lang="less" scoped>
    .popup-header-row {
        span {
            color: #409EFF;
            padding: 4px 8px;
        }
    }
</style>
