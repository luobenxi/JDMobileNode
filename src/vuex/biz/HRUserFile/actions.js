import HRUserFile from '../../../services/HRUserFileService';

const _api = new HRUserFile();

// 获取个人档案
const GetHRUserFilePersonal = (
    { commit }
) => new Promise((resolve, reject) => {
    _api.GetHRUserFilePersonal().then((res) => {
        resolve(res.data);
    }).catch(err => {
        reject(err || '');
    })
});

export default {
    GetHRUserFilePersonal,
};
