import { ApiPreFix } from '../vuex/mutation-types';
import AjaxUtil from '../axios/index';

const _mm = new AjaxUtil();

class AskForLeave {
    GetAskForLeaveList(data) {
        return _mm.requestGet(`${ApiPreFix}/AskForLeaveApi/PersonAskForLeaveList?YYear=${data.condition.YYear}&pageIndex=${data.paging.pageIndex}&pageSize=${data.paging.pageSize}`);
    }
    GetAskForLeaveByKey(data) {
        return _mm.requestGet(`${ApiPreFix}/AskForLeaveApi/GetAskForLeaveByKey?ID=${data}`);
    }
    GetAskForLeaveDetailByWfDetailId(data) {
        return _mm.requestGet(`${ApiPreFix}/AskForLeaveApi/GetAskForLeaveDetailByWfDetailId?wfDetailId=${data}`);
    }
    SaveAskForLeave(data) {
        return _mm.requestPost(`${ApiPreFix}/AskForLeaveApi/PersonAskForLeaveSave`, data);
    }
	DeleteAskForLeaveByKey(data) {
        return _mm.requestDelete(`${ApiPreFix}/AskForLeaveApi/DeleteAskForLeaveByKey?ID=${data}`);
    }
}

export default AskForLeave;
