import Test from '../../../services/TestService';
import { TEST_LIST } from '../../mutation-types';

const _api = new Test();

// 获取测试列表
const GetTestList = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetTestList(SubData).then((res) => {
        commit(TEST_LIST, res.result);
        resolve(res.result);
    }).catch(err => {
        reject(err || '');
    })
});

export default {
    GetTestList,
};
