import WorkFlow from '../../../services/WorkFlowService';

const _api = new WorkFlow();

// 获取流程审批列表
const GetWorkFlowApproveUserList = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetWorkFlowApproveUserList(SubData).then((res) => {
        resolve(res.data);
    }).catch(err => {
        reject(err || '');
    })
});

// 开始审批
const ApproveStart = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.ApproveStart(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

const GetWorkFlowsDoUrl = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetWorkFlowsDoUrl(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

const GetWorkFlowsViewUrl = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetWorkFlowsViewUrl(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

const ApprovePass = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.ApprovePass(SubData).then((res) => {
        resolve(res.data);
    }).catch(err => {
        reject(err || '');
    })
});

const GetApprovePassUserList = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetApprovePassUserList(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

const ApprovePassPost = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.ApprovePassPost(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

const ApproveFinish = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.ApproveFinish(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

const ApproveWithDraw = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.ApproveWithDraw(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

const ApproveRefuse = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.ApproveRefuse(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

const ApproveReturn = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.ApproveReturn(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

const ApproveReturnPost = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.ApproveReturnPost(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

export default {
    GetWorkFlowApproveUserList,
    ApproveStart,
    GetWorkFlowsDoUrl,
    GetWorkFlowsViewUrl,
    ApprovePass,
    GetApprovePassUserList,
    ApprovePassPost,
    ApproveFinish,
    ApproveWithDraw,
    ApproveRefuse,
    ApproveReturn,
    ApproveReturnPost,
};
