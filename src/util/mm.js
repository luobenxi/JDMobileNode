import axios from 'axios';
import moment from 'moment';
import { Toast, Dialog } from 'vant';

moment.locale('zh-cn');

// http request 拦截器
axios.timeout = 30000; // 指定请求超时的毫秒数(0 表示无超时时间)
axios.interceptors.request.use(
    config => {
        config.headers = {
            // 'token': localStorage.getItem('user.token')
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
        // 第一步执行
        if (res.status === 200) {
            if (res.data.code === 401) {
                // 未登录
                window.location.href = this.GetLoginPageUrl();
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
        // 第一步执行
        if (err.response.status === 404 || err.response.status === 500 || err.response.status === 304) {
            // let errMsg = err.response.statusText
        }
        return Promise.reject(err.response);
    }
);

class MUtil {
    // 通用请求
    request(params) {
        return new Promise((resolve, reject) => {
            axios({
                url: params.url,
                method: params.type || 'get',
                dataType: params.dataType || 'json',
                data: params.data || null
            })
            .then((res) => {
                // 第二步执行
                if (res.code !== undefined && res.code === 401) {
                    // 401表示未登录
                    this.doLogin();
                } else {
                    // 成功
                    resolve(res);
                }
            })
            .catch((err) => {
                // 第二步执行
                reject(err.statusText || '网络错误');
            });
        });
    }
    // GET请求
    requestGet(url) {
        return new Promise((resolve, reject) => {
            axios.get(url)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err.statusText || '网络错误');
            });
        });
    }
    // POST请求
    requestPost(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, data)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err.statusText || '网络错误');
            });
        });
    }
    // PUT请求
    requestPut(url, data) {
        return new Promise((resolve, reject) => {
            axios.put(url, data)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err.statusText || '网络错误');
            });
        });
    }
    // DELETE请求
    requestDelete(url) {
        return new Promise((resolve, reject) => {
            axios.delete(url)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err.statusText || '网络错误');
            });
        });
    }
    GetLoginPageUrl() {
        // return '/Mobile/Index/#/login';
        return '/unLogon/mLogon';
    }
    // 跳转登录
    doLogin() {
        window.location.href = this.GetLoginPageUrl();
    }
    checkIsLogin() {
        let Cookie = this.getCookie(this.CookieKeys_UserInfo());
        if (!Cookie) {
            this.errorTips('请先登录');
            window.location.href = this.GetLoginPageUrl();
        }
    }
    // 获取URL参数
    getUrlParam(name) {
        // param=123&param1=456
        let queryString = window.location.search.split('?')[1] || '';
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        let result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    // 成功提示
    successTips(successMsg) {
        Toast(successMsg || '操作成功！');
    }
    // 错误提示
    errorTips(errMsg) {
        Toast(errMsg || '好像哪里不对了~');
    }
    // 成功提示
    successToast(successMsg) {
        Toast.success(successMsg || '操作成功！');
    }
    // 错误提示
    errorToast(errMsg) {
        Toast.fail(errMsg || '好像哪里不对了~');
    }
    // 成功提示
    successDialog(successMsg) {
        Dialog.alert({
            title: '成功提示',
            message: successMsg || '操作成功！'
        });
    }
    // 错误提示
    errorDialog(errMsg) {
        Dialog.alert({
            title: '错误提示',
            message: errMsg || '好像哪里不对了~'
        });
    }
    // 设置本地存储
    setStorage(name, data) {
        let dataType = typeof data;
        // json对象
        if (dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(data));
        } else if (['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
            // 基础类型
            window.localStorage.setItem(name, data);
        } else {
            // 其他不支持的类型
            alert('该类型不能用于本地存储');
        }
    }
    // 取出本地存储内容
    getStorage(name) {
        let data = window.localStorage.getItem(name);
        return data || '';
    }
    // 删除本地存储
    removeStorage(name) {
        window.localStorage.removeItem(name);
    }
    formatTime(originTime) {
        if (!originTime) return '';
        return moment(originTime).format('YYYY-MM-DD HH:mm:ss');
    }
    formatDate(originTime) {
        if (!originTime) return null;
        return moment(originTime).format('YYYY-MM-DD');
    }
    formatStrDate(originTime) {
        if (!originTime) return null;
        return moment(new Date(originTime)).format('YYYY-MM-DD');
    }
    formatMonth(originTime) {
        if (!originTime) return null;
        return moment(originTime).format('YYYY-MM');
    }
    formatYear(originTime) {
        if (!originTime) return null;
        return moment(originTime).format('YYYY');
    }
    // 判断一个值是否在一个数组中存在，如果存在返回true，否则返回false
    checkValueIsExistArray(arr = [], obj) {
        let i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }
    CookieKeys_UserInfo() {
        return 'HR_E97D1714-33A6-4D33-80C7-F18B1A60E624';
    }
    // 移动端员工自助URL
    GetEmployeeSelfHelpUrl() {
        return '/sub-menu/b2ba1a15-6ef5-4ad6-b732-3bca5318ab8c';
    }
    getCookie(Name) {
        let search = Name + "="; // 查询检索的值
        let returnValue = "";//返回值
        if (document.cookie.length > 0) {
            let sd = document.cookie.indexOf(search);
            let end = '';
            if (sd !== -1) {
                sd += search.length;
                end = document.cookie.indexOf(";", sd);
                if (end === -1)
                    end = document.cookie.length;
                returnValue = unescape(document.cookie.substring(sd, end))
            }
        }
        return returnValue;
    }
    formatMoney(number, places, symbol, thousand, decimal) {
        number = number || 0;
        places = !isNaN(places = Math.abs(places)) ? places : 2;
        symbol = symbol !== undefined ? symbol : "";
        thousand = thousand || ",";
        decimal = decimal || ".";
        var negative = number < 0 ? "-" : "",
            i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
    }
}

export default MUtil;
