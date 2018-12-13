<template>
    <div id="jd-upload">
        <van-row gutter="10">
            <van-col :span="6">{{leftText}}</van-col>
            <van-col :span="10">
                <van-uploader :after-read="onRead" v-if="isMultiple"
                              accept="image/gif, image/jpeg, image/jpg, image/png" multiple>
                    <van-icon name="photograph"/>
                </van-uploader>
                <van-uploader :after-read="onRead" v-if="!isMultiple"
                              accept="image/gif, image/jpeg, image/jpg, image/png">
                    <van-icon name="photograph"/>
                </van-uploader>
            </van-col>
            <van-col class="ext-des" :span="8"><span @click="extDesClick">{{rightText}}</span></van-col>
        </van-row>
        <van-loading class="loading-box" v-if="UploadLoading" color="#909399"/>
        <van-cell v-if="UploadFinishList.length">
            <van-row type="flex" v-for="(item, index) in UploadFinishList" :key="index" justify="space-around"
                     class="DateArrRow">
                <van-col span="18">
                    <img :src="item.SavePath" alt="图片" style="width: 100%">
                </van-col>
                <van-col class="deleteText" span="6"
                         style="display: flex; align-items: center; justify-content: center">
                    <span @click="deleteFileItem(item.name, index)">删除</span>
                </van-col>
            </van-row>
            <div class="total-file-box">已上传{{UploadFinishList.length}}个附件</div>
        </van-cell>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    import MUtil from '../../util/mm';
    import {Dialog} from 'vant';

    const _mm = new MUtil();
    export default {
        name: 'JdUpload',
        props: {
            InitFileList: {
                type: Array,
                default: () => []
            },
            leftText: {
                type: String,
                default: () => '上传附件'
            },
            rightText: {
                type: String,
                default: () => '附件类型说明'
            },
            // 是否支持多选
            isMultiple: {
                type: Boolean,
                default: () => true
            }
        },
        data() {
            return {
                UploadLoading: false,
                UploadFinishList: [], // 组件使用到的字段 name，SavePath
            };
        },
        watch: {
            InitFileList(val) {
                this.UploadFinishList = val;
            }
        },
        methods: {
            ...mapActions([
                'UploadFileHandle',
            ]),
            // dataURL to blob
            convertBase64UrlToBlob(urlData) {
                let arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {type: mime});
            },
            // blob to dataURL
            blobToDataURL(blob, callback) {
                let a = new FileReader();
                a.onload = function (e) {
                    callback(e.target.result);
                };
                a.readAsDataURL(blob);
            },
            // 压缩图片
            FileCompress(base64, bili, callback) {
                //处理缩放，转格式
                let _img = new Image();
                _img.src = base64;
                _img.onload = function () {
                    let _canvas = document.createElement("canvas");
                    let w = this.width / bili;
                    let h = this.height / bili;
                    _canvas.setAttribute("width", w);
                    _canvas.setAttribute("height", h);
                    _canvas.getContext("2d").drawImage(this, 0, 0, w, h);
                    let base64 = _canvas.toDataURL("image/jpeg");
                    _canvas.toBlob(function (blob) {
                        if (blob.size > 1024 * 1024) {
                            // 一直压缩至1MB以内
                            this.FileCompress(base64, bili, callback);
                        } else {
                            callback(blob, base64);
                        }
                    }, "image/jpeg");
                }
            },
            // 判断图片是否需要压缩，超过1MB进行压缩
            CheckFileIsNeedCompress(item) {
                let itemTemp = Object.assign({}, {
                    content: item.content,
                    name: item.file.name,
                    type: item.file.type,
                    size: item.file.size,
                    sizeUnit: _mm.FileSizeUnitConvent(item.file.size)
                });
                return new Promise((resolve, reject) => {
                    if (itemTemp.size / 1024 > 1024) {
                        // 超过1MB时需要压缩图片
                        this.FileCompress(itemTemp.content, 1.5, (blob) => {
                            // 压缩后重新给图片大小赋值
                            itemTemp.size = blob.size;
                            itemTemp.sizeUnit = _mm.FileSizeUnitConvent(blob.size);
                            // 将压缩后的图片再转为base64编码格式
                            this.blobToDataURL(blob, (base64Url) => {
                                // 转码后重新赋值
                                itemTemp.content = base64Url;
                                resolve(itemTemp);
                            });
                        });
                    } else {
                        resolve(itemTemp);
                    }
                });
            },
            // 文件选择
            onRead(file) {
                let fileList = file.length > 1 ? file : [file];
                let data = [];
                if (fileList.length > 0) {
                    fileList.map((item, index) => {
                        this.CheckFileIsNeedCompress(item).then((temp) => {
                            temp.content = temp.content.split(',')[1];
                            data.push(temp);
                            if (index === fileList.length - 1) {
                                this.CheckFileExt(data);
                            }
                        });
                    });
                }
            },
            // 判断文件扩展名
            CheckFileExt(data) {
                let FileExtArr = _mm.getFileExtArrByType('images');
                let errExtFileArr = [];
                data.map((item) => {
                    let nameArr = item.name.split('.');
                    let ext = nameArr[nameArr.length - 1];
                    if (!FileExtArr.includes(ext)) {
                        // 不支持的扩展名
                        errExtFileArr.push(item.name); // 添加到不支持扩展名的数组中
                    }
                });
                if (errExtFileArr.length) {
                    _mm.errorDialog(errExtFileArr.join('，') + ' 文件类型不支持');
                } else {
                    this.UploadFileSubmit(data);
                }
            },
            // 上传图片
            UploadFileSubmit(data) {
                if (data.length === 0) {
                    _mm.errorTips('未选择附件');
                    return;
                }
                let CurrentUploadCount = 0;
                this.UploadLoading = true; // 打开loading
                // 多个文件时一个一个上传
                data.map((item, index) => {
                    let tempData = []; // 后端接收的是一个数组
                    tempData.push(item);
                    this.UploadFileHandle(tempData).then((res) => {
                        if (res.success) {
                            CurrentUploadCount++;
                            this.UploadFinishList.push(...res.data);
                        } else {
                            _mm.errorTips(res.msg);
                        }
                        // 文件列表上传完成
                        if (index === data.length - 1) {
                            this.UploadLoading = false; // 关闭loading
                            this.emitDataHandle(); // 返回数据给父组件
                            _mm.successTips('上传成功' + CurrentUploadCount + '个文件！');
                        }
                    });
                });
            },
            // 删除已上传的图片
            deleteFileItem(name, index) {
                Dialog.confirm({
                    title: '提示',
                    message: '你确认要删除 ' + name + ' 附件吗？'
                }).then(() => {
                    this.UploadFinishList.splice(index, 1); // 从下标为index删除，删除一个元素
                    this.emitDataHandle(); // 返回数据给父组件
                }).catch(() => {
                });
            },
            extDesClick() {
                let FileExtArr = _mm.getFileExtArrByType('images');
                let str = '支持的图片类型：' + FileExtArr.join('，');
                _mm.infoDialog(str);
            },
            // 返回数据给父组件
            emitDataHandle() {
                this.$emit('getData', this.UploadFinishList);
            }
        },
        mounted() {
            this.UploadFinishList = this.InitFileList;
        }
    };
</script>

<style lang="less" scoped>
    @import "../../style/common/common";

    #jd-upload {
        .deleteText {
            color: red;
        }
        .ext-des {
            color: #409EFF;
            display: flex;
            justify-content: flex-end;
        }
        .total-file-box {
            font-size: 12px;
            color: #909399;
        }
    }
</style>
