import OverTimeWork from '../../../services/OverTimeWorkService';
import {
    SET_OverTimeWork_LIST
} from '../../mutation-types';

const _api = new OverTimeWork();

// 获取加班列表
const GetOverTimeWorkList = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetOverTimeWorkList(SubData).then((res) => {
        commit(SET_OverTimeWork_LIST, res.data);
        resolve(res.data);
    }).catch(err => {
        reject(err || '');
    })
});

// 获取一条加班
const GetOverTimeWorkByKey = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetOverTimeWorkByKey(SubData).then((res) => {
        resolve(res.data);
    }).catch(err => {
        reject(err || '');
    })
});

// 保存加班
const SaveOverTimeWork = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.SaveOverTimeWork(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

// 删除加班
const DeleteOverTimeWorkByKey = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.DeleteOverTimeWorkByKey(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

export default {
    GetOverTimeWorkList,
    GetOverTimeWorkByKey,
    SaveOverTimeWork,
	DeleteOverTimeWorkByKey,
};
