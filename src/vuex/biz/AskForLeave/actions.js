import AskForLeave from '../../../services/AskForLeaveService';
import {
    SET_AskForLeave_LIST
} from '../../mutation-types';

const _api = new AskForLeave();

// 获取请假列表
const GetAskForLeaveList = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetAskForLeaveList(SubData).then((res) => {
        commit(SET_AskForLeave_LIST, res.data);
        resolve(res.data);
    }).catch(err => {
        reject(err || '');
    })
});

// 获取一条请假
const GetAskForLeaveByKey = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetAskForLeaveByKey(SubData).then((res) => {
        resolve(res.data);
    }).catch(err => {
        reject(err || '');
    })
});

// 保存请假
const SaveAskForLeave = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.SaveAskForLeave(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

// 删除请假
const DeleteAskForLeaveByKey = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.DeleteAskForLeaveByKey(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

export default {
    GetAskForLeaveList,
    GetAskForLeaveByKey,
    SaveAskForLeave,
	DeleteAskForLeaveByKey,
};
