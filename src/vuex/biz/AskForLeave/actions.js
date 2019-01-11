import AskForLeave from '../../../services/AskForLeaveService';
import { SET_ASK_FOR_LEAVE_LIST } from '../../mutation-types';
const _api = new AskForLeave();

// 获取请假列表
const GetAskForLeaveList = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetAskForLeaveList(SubData).then((res) => {
        commit(SET_ASK_FOR_LEAVE_LIST, res.data);
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

// 根据流程明细ID获取一条请假单详情信息
const GetAskForLeaveDetailByWfDetailId = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetAskForLeaveDetailByWfDetailId(SubData).then((res) => {
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


/******************销假相关开始****************/
// 保存并获取销假单
const AskForLeaveCancelSave = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.AskForLeaveCancelSave(SubData).then((res) => {
        resolve(res.data);
    }).catch(err => {
        reject(err || '');
    })
});

// 保存销假单
const AskForLeaveCancelSavePost = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.AskForLeaveCancelSavePost(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

// 根据销假申请单ID获取一条数据
const GetAskForLeaveCancelByKey = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetAskForLeaveCancelByKey(SubData).then((res) => {
        resolve(res.data);
    }).catch(err => {
        reject(err || '');
    })
});

// 根据请假单ID获取对应的销假单
const GetAskForLeaveCancelByAskForLeaveID = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetAskForLeaveCancelByAskForLeaveID(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

// 根据流程明细ID获取一条销假单详情信息
const GetAskForLeaveCancelByWfDetailId = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetAskForLeaveCancelByWfDetailId(SubData).then((res) => {
        resolve(res.data);
    }).catch(err => {
        reject(err || '');
    })
});

/******************销假相关结束****************/

export default {
    GetAskForLeaveList,
    GetAskForLeaveByKey,
    GetAskForLeaveDetailByWfDetailId,
    SaveAskForLeave,
	DeleteAskForLeaveByKey,
    AskForLeaveCancelSave,
    AskForLeaveCancelSavePost,
    GetAskForLeaveCancelByKey,
    GetAskForLeaveCancelByAskForLeaveID,
    GetAskForLeaveCancelByWfDetailId,
};
