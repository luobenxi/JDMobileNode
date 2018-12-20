<template>
    <div class="Test-box">
        Test components
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import MUtil from '../../util/mm';

    const _mm = new MUtil();

    export default {
        name: 'Test',
        data () {
            return {
                itemList: []
            }
        },
        computed: {
            ...mapGetters([
            ]),
        },
        components: {
        },
        methods: {
            ...mapActions([
                'GetTestList'
            ]),
        },
        mounted() {
            this.GetTestList().then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
        }
    }
</script>

<style lang="less" scoped>
    #Test-box {
    }
</style>
