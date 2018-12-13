<template>
    <div class="WorkFlow-box">
        WorkFlow components
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import MUtil from '../../util/mm';

    const _mm = new MUtil();

    export default {
        name: 'WorkFlow',
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
    #WorkFlow-box {
    }
</style>
