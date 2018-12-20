import Test from '../../../services/TestService';

const _api = new Test();

// 获取测试列表
const GetTestList = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetTestList(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

export default {
    GetTestList,
};
