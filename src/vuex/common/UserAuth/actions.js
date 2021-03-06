import User from '../../../services/UserAuthService';
import {
    SET_AUTHORITIES,
    ALL_USER_LIST,
    SET_CURRENT_USER_INFO,
} from '../../mutation-types';

const _user = new User();

const LoginCheckHandle = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _user.LoginCheckHandle(SubData).then((res) => {
        if (res.success) {
            // 登录成功
            resolve(res.data);
        } else {
            // 用户名或密码错误
            reject(res.msg || '');
        }
    }).catch((err) => {
        reject(err);
    });
});

const LoginOutHandle = (
    { commit }
) => new Promise((resolve, reject) => {
    _user.LoginOutHandle().then((res) => {
        if (res.success) {
            // 退出登录成功
            resolve(res);
        } else {
            // 退出登录失败
            reject(res.msg || '');
        }
    }).catch((err) => {
        reject(err);
    });
});

// 获取当前用户信息，并存入store
const GetUserInfo = (
    { commit }
) => new Promise((resolve, reject) => {
    _user.GetUserInfo().then((res) => {
        if (res.success) {
            commit(SET_CURRENT_USER_INFO, res.data);
            resolve(res.data);
        } else {
            reject(res.msg || '');
        }
    }).catch((err) => {
        reject(err);
    });
});

const GetMyAuthList = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    commit(SET_AUTHORITIES, []); // 请求之前先把store置为[]
    _user.GetMyAuthList(SubData).then((res) => {
        commit(SET_AUTHORITIES, res.data); // 请求成功后再重新赋值store
        resolve(res);
    }).catch((err) => {
        reject(err);
    });
});

const UpdateUserPwd = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _user.UpdateUserPwd(SubData).then((res) => {
        if (res.success) {
            resolve(res);
        } else {
            reject(res.msg);
        }
    }).catch((err) => {
        reject(err);
    });
});

const UpdateUserSalaryPwd = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _user.UpdateUserSalaryPwd(SubData).then((res) => {
        if (res.success) {
            resolve(res);
        } else {
            reject(res.msg);
        }
    }).catch((err) => {
        reject(err);
    });
});

const ResetUserSalaryPwd = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _user.ResetUserSalaryPwd(SubData).then((res) => {
        if (res.success) {
            resolve(res);
        } else {
            reject(res.msg);
        }
    }).catch((err) => {
        reject(err);
    });
});

const GetAllUerList = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _user.GetAllUerList(SubData).then((res) => {
        if (res.success) {
            commit(ALL_USER_LIST, res.data);
            resolve(res);
        } else {
            reject(res.msg || '');
        }
    }).catch((err) => {
        reject(err);
    });
});

const GetDepartTreeByParentID = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _user.GetDepartTreeByParentID(SubData).then((res) => {
        if (res.success) {
            resolve(res.data);
        } else {
            reject(res.msg || '');
        }
    }).catch((err) => {
        reject(err);
    });
});

const GetUserListByDepartID = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _user.GetUserListByDepartID(SubData).then((res) => {
        if (res.success) {
            resolve(res.data);
        } else {
            reject(res.msg || '');
        }
    }).catch((err) => {
        reject(err);
    });
});

export default {
    LoginCheckHandle,
    LoginOutHandle,
    GetUserInfo,
    GetMyAuthList,
    UpdateUserPwd,
    UpdateUserSalaryPwd,
    ResetUserSalaryPwd,
    GetAllUerList,
    GetDepartTreeByParentID,
    GetUserListByDepartID,
};
