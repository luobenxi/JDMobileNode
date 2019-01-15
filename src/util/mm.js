import moment from 'moment';
import {Toast, Dialog} from 'vant';
moment.locale('zh-cn');

class MUtil {
    GetLoginPageUrl() {
        // return '/Mobile/Index/#/login';
        return '/UnLogon/Error?msg=退出成功';
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

    // 获取给定URL中的参数
    getSpecialUrlParam(url, name) {
        let queryString = url.split('?')[1] || '';
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        let result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }

    // 成功提示，无图标
    successTips(successMsg) {
        Toast(successMsg || '操作成功！');
    }

    // 错误提示，无图标
    errorTips(errMsg) {
        Toast(errMsg || '好像哪里不对了~');
    }

    // 成功提示，大图标
    successToast(successMsg) {
        Toast.success(successMsg || '操作成功！');
    }

    // 错误提示，大图标
    errorToast(errMsg) {
        Toast.fail(errMsg || '好像哪里不对了~');
    }

    // 成功提示，需要手动关闭
    successDialog(successMsg) {
        Dialog.alert({
            title: '成功提示',
            message: successMsg || '操作成功！'
        });
    }

    // 一般提示，需要手动关闭
    infoDialog(Msg) {
        Dialog.alert({
            title: '提示',
            message: Msg || '操作成功！'
        });
    }

    // 错误提示，需要手动关闭
    errorDialog(errMsg) {
        Dialog.alert({
            title: '错误提示',
            message: errMsg || '好像哪里不对了~'
        });
    }

    // 确认消息提示，需要手动关闭，包含确认按钮和点击确认按钮后要执行的回调函数
    confirmDialog(Msg, thenCallBack, IsShowCancelButton = false) {
        Dialog.confirm({
            title: '提示',
            message: Msg,
            showCancelButton: IsShowCancelButton // 不显示取消按钮
        }).then(() => {
            if (typeof thenCallBack === 'function') {
                thenCallBack(); // 执行回调
            } else {
                this.errorDialog('成功回调参数类型异常');
            }
        }).catch(err => {
            console.log('cancel');
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

    formatTime(originTime) {
        if (!originTime) return '';
        if (typeof originTime === 'string') {
            originTime = new Date(originTime);
        }
        return moment(originTime).format('YYYY-MM-DD HH:mm:ss');
    }

    formatTimeOnly(originTime) {
        if (!originTime) return '';
        if (typeof originTime === 'string') {
            originTime = new Date(originTime);
        }
        return moment(originTime).format('HH:mm:ss');
    }

    formatDate(originTime) {
        if (!originTime) return null;
        if (typeof originTime === 'string') {
            originTime = new Date(originTime);
        }
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

    formatMoney(number, places, symbol, thousand, decimal) {
        number = number || 0;
        places = !isNaN(places = Math.abs(places)) ? places : 2;
        symbol = symbol !== undefined ? symbol : "";
        thousand = thousand || ",";
        decimal = decimal || ".";
        let negative = number < 0 ? "-" : "",
            i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
    }

    addDateYear(date, num) {
        let sDate = new Date(date);
        num = parseInt(num);
        let sYear = sDate.getFullYear();
        let sMonth = sDate.getMonth();
        let sDay = sDate.getDate();
        return new Date(sYear + num, sMonth, sDay);
    }

    addDateMonth(date, num) {
        let sDate = new Date(date);
        num = parseInt(num);
        let sYear = sDate.getFullYear();
        let sMonth = sDate.getMonth() + 1;
        let sDay = sDate.getDate();
        let eYear = sYear;
        let eMonth = sMonth + num; // 添加的月份数
        let eDay = sDay;
        if (eMonth > 12) {
            eYear++;
            eMonth -= 12;
        }
        return new Date(eYear, eMonth - 1, eDay);
    }

    addDateDay(date, num) {
        // 未实现
        return new Date(date);
    }

    // 判断一个值是否在一个数组中存在，如果存在返回true，否则返回false，等同于 includes
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

    // 当前处理的分类URL Key
    GetCurrentToDoCategoryUrlKey() {
        return 'CurrentToDoCategoryUrl';
    }

    FileSizeUnitConvent(limit) {
        let size = "";
        if (limit < 0.1 * 1024) {                            //小于0.1KB，则转化成B
            size = limit.toFixed(2) + "B"
        } else if (limit < 0.1 * 1024 * 1024) {            //小于0.1MB，则转化成KB
            size = (limit / 1024).toFixed(2) + "KB"
        } else if (limit < 0.1 * 1024 * 1024 * 1024) {        //小于0.1GB，则转化成MB
            size = (limit / (1024 * 1024)).toFixed(2) + "MB"
        } else {                                            //其他转化成GB
            size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB"
        }
        let sizeStr = size + "";                         //转成字符串
        let index = sizeStr.indexOf(".");                //获取小数点处的索引
        let dou = sizeStr.substr(index + 1, 2);          //获取小数点后两位的值
        if (dou === "00") {                              //判断后两位是否为00，如果是则删除00
            return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
        }
        return size;
    }

    getFileExtArrByType(type) {
        let arr = [];
        switch (type) {
            case 'images': {
                arr = ['png', 'jpg', 'jpeg', 'gif'];
                break;
            }
            case 'file': {
                arr = ['*']; // * 代表所有类型的文件
                break;
            }
            default: {}
        }
        return arr;
    }

    DateBetweenForeach(begin, end) {
        let date1 = begin;
        let date2 = end;
        let d1 = new Date(date1.replace(/[- ]/g, ","));
        let d2 = new Date(date2.replace(/[- ]/g, ","));
        let d = d1;
        let arr = [];
        while (d <= d2) {
            let month = (d.getMonth() + 1) < 10 ? `0${(d.getMonth() + 1)}` : (d.getMonth() + 1);
            let day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
            let temp = d.getFullYear() + '-' + month + '-' + day;
            arr.push(temp);
            d.setDate(d.getDate() + 1);
        }
        return arr;
    }
}

export default MUtil;
