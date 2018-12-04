import AnnualLeave from '../../../services/AnnualLeaveService';

const _api = new AnnualLeave();

// 获取个人剩余休假数据
const GetPersonWorkAnnualLeaveList = (
    { commit }
) => new Promise((resolve, reject) => {
    _api.GetPersonWorkAnnualLeaveList().then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

export default {
    GetPersonWorkAnnualLeaveList,
};
