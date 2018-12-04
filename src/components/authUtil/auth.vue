<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'MyAuthList',
            ]),
        },
        methods: {
            // 验证是否有权限 (按钮是否显示)
            checkAuth(param) {
                return this.MyAuthList && this.MyAuthList.length > 0 &&
                this.MyAuthList.indexOf(param) !== -1 ? 1 : 0;
            },
        },
    };
</script>
