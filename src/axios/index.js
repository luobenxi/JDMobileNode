import axios from 'axios';
import MUtil from '../util/mm';

const _mm = new MUtil();

// http request 拦截器
axios.timeout = 10000; // 指定请求超时的毫秒数(0 表示无超时时间)
axios.interceptors.request.use(
    config => {
        config.headers = {
            // 'token': localStorage.getItem('user.token') // 在请求头中添加其他属性
        };
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    res => {
        // 成功第一步执行
        if (res.status === 200) {
            if (res.data.code === 401) {
                // 未登录
                window.location.href = _mm.GetLoginPageUrl();
            } else if (res.data.code === 403) {
                // 无操作权限
                window.location.href = '/#/error';
            }
            return Promise.resolve(res.data);
        } else {
            return Promise.reject(res.statusText || '网络错误');
        }
    },
    err => {
        // 失败第一步执行
        if (err.response.status === 404 || err.response.status === 500 || err.response.status === 304) {
            // let errMsg = err.response.statusText
        }
        return Promise.reject(err.response);
    }
);

class AjaxUtil {
    /***************************请求封装开始***************************/
    // 通用请求，暂未使用
    request(params, isShowLoading = true) {
        if (isShowLoading !== false) {
            this.openAjaxLoading(); // 打开loading
        }
        return new Promise((resolve, reject) => {
            axios({
                url: params.url,
                method: params.type || 'get',
                dataType: params.dataType || 'json',
                data: params.data || null
            })
                .then((res) => {
                    if (isShowLoading !== false) {
                        this.closeAjaxLoading(); // 关闭loading
                    }
                    // 成功第二步执行
                    resolve(res);
                })
                .catch((err) => {
                    // 失败第二步执行
                    reject(err.statusText || '网络错误');
                });
        });
    }

    // GET请求
    requestGet(url, isShowLoading = true) {
        // 请求之前
        if (isShowLoading) {
            this.openAjaxLoading(); // 打开loading
        }
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then((res) => {
                    // 请求成功
                    if (isShowLoading) {
                        this.closeAjaxLoading(); // 关闭loading
                    }
                    resolve(res);
                })
                .catch((err) => {
                    // 请求失败
                    reject(err.statusText || '网络错误');
                });
        });
    }

    // POST请求
    requestPost(url, data, isShowLoading = true) {
        if (isShowLoading) {
            this.openAjaxLoading(); // 打开loading
        }
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((res) => {
                    if (isShowLoading) {
                        this.closeAjaxLoading(); // 关闭loading
                    }
                    resolve(res);
                })
                .catch((err) => {
                    reject(err.statusText || '网络错误');
                });
        });
    }

    // PUT请求
    requestPut(url, data, isShowLoading = true) {
        if (isShowLoading) {
            this.openAjaxLoading(); // 打开loading
        }
        return new Promise((resolve, reject) => {
            axios.put(url, data)
                .then((res) => {
                    if (isShowLoading) {
                        this.closeAjaxLoading(); // 关闭loading
                    }
                    resolve(res);
                })
                .catch((err) => {
                    reject(err.statusText || '网络错误');
                });
        });
    }

    // DELETE请求
    requestDelete(url, isShowLoading = true) {
        if (isShowLoading) {
            this.openAjaxLoading(); // 打开loading
        }
        return new Promise((resolve, reject) => {
            axios.delete(url)
                .then((res) => {
                    if (isShowLoading) {
                        this.closeAjaxLoading(); // 关闭loading
                    }
                    resolve(res);
                })
                .catch((err) => {
                    reject(err.statusText || '网络错误');
                });
        });
    }

    // 打开loading
    openAjaxLoading() {
        let loading = document.getElementById('ajaxLoading');
        loading.style.display = 'block';
    }

    // 关闭loading
    closeAjaxLoading() {
        let loading = document.getElementById('ajaxLoading');
        loading.style.display = 'none';
    }

    /***************************请求结束***************************/
}

export default AjaxUtil;
