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
}

export default AskForLeave;
