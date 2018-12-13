import { ApiPreFix } from '../vuex/mutation-types';
import AjaxUtil from '../axios/index';

const ajax = new AjaxUtil();

class WorkFlow {
    GetWorkFlowApproveUserList(data) {
        return ajax.requestPost(`${ApiPreFix}/WorkFlowApi/GetWorkFlowApproveUserList`, data);
    }
    ApproveStart(data) {
        return ajax.requestPost(`${ApiPreFix}/WorkFlowApi/ApproveStart`, data);
    }
    GetWorkFlowsDoUrl(data) {
        return ajax.requestGet(`${ApiPreFix}/WorkFlowApi/GetWorkFlowsDoUrl?wfDetailId=${data.wfDetailId}&activeId=${data.activeId}`);
    }
    GetWorkFlowsViewUrl(data) {
        return ajax.requestGet(`${ApiPreFix}/WorkFlowApi/GetWorkFlowsViewUrl?wfId=${data.wfId}&wfDetailId=${data.wfDetailId}&activeId=${data.activeId}&keyId=${data.keyId}`);
    }
    ApprovePass(data) {
        return ajax.requestGet(`${ApiPreFix}/WorkFlowApi/ApprovePass?wfDetailID=${data}`);
    }
    GetApprovePassUserList(data) {
        return ajax.requestGet(`${ApiPreFix}/WorkFlowApi/GetApprovePassUserList?activeID=${data.ActiveID}&keyID=${data.KeyID}&createUserID=${data.CreateUserID}&prvUserID=${data.PrvUserID}`);
    }
    ApprovePassPost(data) {
        return ajax.requestPost(`${ApiPreFix}/WorkFlowApi/ApprovePass`, data);
    }
    ApproveFinish(data) {
        return ajax.requestPost(`${ApiPreFix}/WorkFlowApi/ApproveFinish`, data);
    }
}

export default WorkFlow;
