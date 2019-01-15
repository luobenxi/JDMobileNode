<template>
    <div class="Test-box">
        <van-notice-bar mode="link" text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。" />
        <van-button size="small" class="btn-item" @click="chooseDate">选择时间</van-button>
        <JdCheckboxDatePopup :popupIsShow="popupIsShow" @onConfirm="GetCheckedDate"></JdCheckboxDatePopup>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import JdCheckboxDatePopup from '../../components/common/checkboxDatePopup';
    import MUtil from '../../util/mm';

    const _mm = new MUtil();

    export default {
        name: 'Test',
        data () {
            return {
                popupIsShow: false,
            }
        },
        computed: {
        },
        components: {
            [JdCheckboxDatePopup.name]: JdCheckboxDatePopup,
        },
        methods: {
            ...mapActions([
                'GetTestList',
            ]),
            chooseDate() {
                this.popupIsShow = !this.popupIsShow;
            },
            GetCheckedDate(val) {
                console.log(val);
            },
        },
        mounted() {
        }
    }
</script>

<style lang="less" scoped>
    .Test-box {
        padding: 10px;
    }
</style>
