<template>
    <div id="JdFileListBox">
        <van-cell v-if="UploadFinishList.length">
            <van-row type="flex" v-for="(item, index) in UploadFinishList" :key="index" justify="space-around"
                     class="DateArrRow">
                <van-col span="24">
                    <img :src="item.SavePath" @click="imgClick(item.SavePath)" alt="图片" style="width: 100%">
                </van-col>
            </van-row>
            <div class="total-file-box">共{{UploadFinishList.length}}个附件</div>
        </van-cell>
    </div>
</template>

<script>
    import { ImagePreview } from 'vant';
    export default {
        name: 'JdFileList',
        props: {
            InitFileList: {
                type: Array,
                default: () => []
            },
        },
        data() {
            return {
                UploadFinishList: [], // 组件使用到的字段 name，SavePath
            };
        },
        watch: {
            InitFileList(val) {
                this.UploadFinishList = val;
            }
        },
        methods: {
            imgClick(val) {
                let picList = this.UploadFinishList.map(item => item.SavePath);
                let index = picList.indexOf(val);
                ImagePreview({
                    images: picList,
                    startPosition: index,
                });
            }
        },
        mounted() {
            this.UploadFinishList = this.InitFileList;
        }
    };
</script>

<style lang="less" scoped>
    @import "../../style/common/common";

    #JdFileListBox {
        .total-file-box {
            font-size: 12px;
            color: #909399;
        }
    }
</style>
