import { ApiPreFix } from '../vuex/mutation-types';
import AjaxUtil from '../axios/index';

const _mm = new AjaxUtil();

class WorkFlow {
    GetWorkFlowApproveUserList(data) {
        return _mm.requestPost(`${ApiPreFix}/WorkFlowApi/GetWorkFlowApproveUserList`, data);
    }
    ApproveStart(data) {
        return _mm.requestPost(`${ApiPreFix}/WorkFlowApi/ApproveStart`, data);
    }
    GetWorkFlowsDoUrl(data) {
        return _mm.requestGet(`${ApiPreFix}/WorkFlowApi/GetWorkFlowsDoUrl?wfDetailId=${data.wfDetailId}&activeId=${data.activeId}`);
    }
    GetWorkFlowsViewUrl(data) {
        return _mm.requestGet(`${ApiPreFix}/WorkFlowApi/GetWorkFlowsViewUrl?wfId=${data.wfId}&wfDetailId=${data.wfDetailId}&activeId=${data.activeId}&keyId=${data.keyId}`);
    }
    ApprovePass(data) {
        return _mm.requestGet(`${ApiPreFix}/WorkFlowApi/ApprovePass?wfDetailID=${data}`);
    }
    GetApprovePassUserList(data) {
        return _mm.requestGet(`${ApiPreFix}/WorkFlowApi/GetApprovePassUserList?activeID=${data.ActiveID}&keyID=${data.KeyID}&createUserID=${data.CreateUserID}&prvUserID=${data.PrvUserID}`);
    }
    ApprovePassPost(data) {
        return _mm.requestPost(`${ApiPreFix}/WorkFlowApi/ApprovePass`, data);
    }
    ApproveFinish(data) {
        return _mm.requestPost(`${ApiPreFix}/WorkFlowApi/ApproveFinish`, data);
    }
}

export default WorkFlow;
