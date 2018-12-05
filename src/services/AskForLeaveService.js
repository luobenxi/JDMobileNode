import { ApiPreFix } from '../vuex/mutation-types';
import MUtil from '../util/mm.js';

const _mm = new MUtil();

class AskForLeave {
    GetAskForLeaveList(data) {
        return _mm.requestGet(`${ApiPreFix}/AskForLeaveApi/GetAskForLeaveList`);
    }
    GetAskForLeaveByKey(data) {
        return _mm.requestGet(`${ApiPreFix}/AskForLeaveApi/GetAskForLeaveByKey?ID=${data}`);
    }
    SaveAskForLeave(data) {
        return _mm.requestPost(`${ApiPreFix}/AskForLeaveApi/SaveAskForLeave`, data);
    }
	DeleteAskForLeaveByKey(data) {
        return _mm.requestDelete(`${ApiPreFix}/AskForLeaveApi/DeleteAskForLeaveByKey?ID=${data}`);
    }
}

export default AskForLeave;
