import { ApiPreFix } from '../vuex/mutation-types';
import AjaxUtil from '../axios/index';

const ajax = new AjaxUtil();

// 该方式在使用时需要实例化，如 const _user = new User();
class User {
    LoginCheckHandle(data) {
        return ajax.requestGet(`${ApiPreFix}/LoginApi/LoginCheckHandle?username=${data.username}&password=${data.password}`);
    }
    LoginOutHandle() {
        return ajax.requestGet(`${ApiPreFix}/LoginApi/LoginOutHandle`);
    }
    GetUserInfo() {
        return ajax.requestGet(`${ApiPreFix}/UserSystemApi/GetUserInfo`);
    }
    GetMyAuthList(data) {
        if(data !== undefined) {
            return ajax.requestGet(`${ApiPreFix}/UserSystemApi/GetMobileAppsTree?ParentID=${data}`);
        } else {
            return ajax.requestGet(`${ApiPreFix}/UserSystemApi/GetMobileAppsTree`);
        }
    }
    UpdateUserPwd(data) {
        return ajax.requestPost(`${ApiPreFix}/UserSystemApi/UpdateUserPwd`, data);
    }
    UpdateUserSalaryPwd(data) {
        return ajax.requestPost(`${ApiPreFix}/UserSystemApi/UpdateUserSalaryPwd`, data);
    }
    GetAllUerList() {
        return ajax.requestGet(`${ApiPreFix}/UserContactsApi/GetAllUerList`);
    }
    GetDepartTreeByParentID(data) {
        return ajax.requestGet(`${ApiPreFix}/UserContactsApi/GetDepartTreeByParentID?ParentID=${data}`);
    }
    GetUserListByDepartID(data) {
        return ajax.requestGet(`${ApiPreFix}/UserContactsApi/GetUserListByDepartID?DepartID=${data.DepartID}&FullName=${data.FullName}`);
    }
    GetWeiXinOpenIDUrl() {
        return ajax.requestGet(`${ApiPreFix}/LoginApi/GetWeiXinOpenIDUrl`);
    }
}

export default User;
