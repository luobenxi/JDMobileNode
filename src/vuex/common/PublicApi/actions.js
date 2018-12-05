import PublicApi from '../../../services/PublicApiService';

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

export default {
    GetDictListByParent,
    GetAskForLeaveTypeList,
    UploadFileHandle,
};
