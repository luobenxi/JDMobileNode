import { ApiPreFix } from '../vuex/mutation-types';
import AjaxUtil from '../axios/index';

const ajax = new AjaxUtil();

class AskForLeave {
    GetAskForLeaveList(data) {
        return ajax.requestGet(`${ApiPreFix}/AskForLeaveApi/PersonAskForLeaveList?YYear=${data.condition.YYear}&pageIndex=${data.paging.pageIndex}&pageSize=${data.paging.pageSize}`);
    }
    GetAskForLeaveByKey(data) {
        return ajax.requestGet(`${ApiPreFix}/AskForLeaveApi/GetAskForLeaveByKey?ID=${data}`);
    }
    GetAskForLeaveDetailByWfDetailId(data) {
        return ajax.requestGet(`${ApiPreFix}/AskForLeaveApi/GetAskForLeaveDetailByWfDetailId?wfDetailId=${data}`);
    }
    SaveAskForLeave(data) {
        return ajax.requestPost(`${ApiPreFix}/AskForLeaveApi/PersonAskForLeaveSave`, data);
    }
	DeleteAskForLeaveByKey(data) {
        return ajax.requestDelete(`${ApiPreFix}/AskForLeaveApi/DeleteAskForLeaveByKey?ID=${data}`);
    }
    /**销假相关开始**/
    AskForLeaveCancelSave(data) {
        return ajax.requestGet(`${ApiPreFix}/AskForLeaveCancelApi/AskForLeaveCancelSave?askForLeaveID=${data}`);
    }
    AskForLeaveCancelSavePost(data) {
        return ajax.requestPost(`${ApiPreFix}/AskForLeaveCancelApi/AskForLeaveCancelSave`, data);
    }
    GetAskForLeaveCancelByKey(data) {
        return ajax.requestGet(`${ApiPreFix}/AskForLeaveCancelApi/GetAskForLeaveCancelByKey?cancelForLeaveID=${data}`);
    }
    GetAskForLeaveCancelByAskForLeaveID(data) {
        return ajax.requestGet(`${ApiPreFix}/AskForLeaveCancelApi/GetAskForLeaveCancelByAskForLeaveID?AskForLeaveID=${data}`);
    }
    GetAskForLeaveCancelByWfDetailId(data) {
        return ajax.requestGet(`${ApiPreFix}/AskForLeaveCancelApi/GetAskForLeaveCancelByWfDetailId?wfDetailId=${data}`);
    }
    /**销假相关结束**/
}

export default AskForLeave;
