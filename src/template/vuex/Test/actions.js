import Test from '../../../services/TestService';
import {
    SET_TEST_LIST
} from '../../mutation-types';

const _api = new Test();

// 获取测试列表
const GetTestList = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetTestList(SubData).then((res) => {
        commit(SET_TEST_LIST, res.data);
        resolve(res.data);
    }).catch(err => {
        reject(err || '');
    })
});

// 获取一条测试
const GetTestByKey = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetTestByKey(SubData).then((res) => {
        resolve(res.data);
    }).catch(err => {
        reject(err || '');
    })
});

// 保存测试
const SaveTest = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.SaveTest(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

// 删除测试
const DeleteTestByKey = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.DeleteTestByKey(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

export default {
    GetTestList,
    GetTestByKey,
    SaveTest,
	DeleteTestByKey,
};
