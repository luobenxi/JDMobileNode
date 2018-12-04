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
            ]),
        },
        mounted() {
        }
    }
</script>

<style lang="less" scoped>
    #Test-box {
    }
</style>
