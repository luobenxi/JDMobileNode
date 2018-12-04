import { ApiPreFix } from '../vuex/mutation-types';
import MUtil from '../util/mm.js';

const _mm = new MUtil();

// 该方式在使用时需要实例化，如 const _user = new User();
class User {
    LoginCheckHandle(data) {
        return _mm.requestGet(`${ApiPreFix}/LoginApi/LoginCheckHandle?username=${data.username}&password=${data.password}`);
    }
    GetUserInfo() {
        return _mm.requestGet(`${ApiPreFix}/UserSystemApi/GetUserInfo`);
    }
    GetMyAuthList(data) {
        if(data !== undefined) {
            return _mm.requestGet(`${ApiPreFix}/UserSystemApi/GetMobileAppsTree?ParentID=${data}`);
        } else {
            return _mm.requestGet(`${ApiPreFix}/UserSystemApi/GetMobileAppsTree`);
        }
    }
    UpdateUserPwd(data) {
        return _mm.requestPost(`${ApiPreFix}/UserSystemApi/UpdateUserPwd`, data);
    }
    UpdateUserSalaryPwd(data) {
        return _mm.requestPost(`${ApiPreFix}/UserSystemApi/UpdateUserSalaryPwd`, data);
    }
    GetAllUerList() {
        return _mm.requestGet(`${ApiPreFix}/UserContactsApi/GetAllUerList`);
    }
    GetDepartTreeByParentID(data) {
        return _mm.requestGet(`${ApiPreFix}/UserContactsApi/GetDepartTreeByParentID?ParentID=${data}`);
    }
    GetUserListByDepartID(data) {
        return _mm.requestGet(`${ApiPreFix}/UserContactsApi/GetUserListByDepartID?DepartID=${data.DepartID}&FullName=${data.FullName}`);
    }
}

export default User;
