import PublicApi from '../../../services/PublicApiService';
import { SET_ASK_FOR_TYPE_LIST, SET_OverTimeWork_TYPE_LIST } from '../../mutation-types';

const api = new PublicApi();

const GetDictListByParent = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    api.GetDictListByParent(SubData).then((res) => {
        resolve(res.data);
    }).catch((err) => {
        reject(err);
    });
});

const GetAskForLeaveTypeList = (
    { commit }
) => new Promise((resolve, reject) => {
    api.GetAskForLeaveTypeList().then((res) => {
        commit(SET_ASK_FOR_TYPE_LIST, res.data);
        resolve(res.data);
    }).catch((err) => {
        reject(err);
    });
});

const GetOverTimeWorkTypeList = (
    { commit }
) => new Promise((resolve, reject) => {
    api.GetOverTimeWorkTypeList().then((res) => {
        commit(SET_OverTimeWork_TYPE_LIST, res.data);
        resolve(res.data);
    }).catch((err) => {
        reject(err);
    });
});

const UploadFileHandle = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    api.UploadFileHandle(SubData).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err);
    });
});

// 获取最新通知消息
const GetNewNoticeInfo = (
    { commit }
) => new Promise((resolve, reject) => {
    api.GetNewNoticeInfo().then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err);
    });
});

export default {
    GetDictListByParent,
    GetAskForLeaveTypeList,
    GetOverTimeWorkTypeList,
    UploadFileHandle,
    GetNewNoticeInfo
};
