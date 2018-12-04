import { ApiPreFix } from '../vuex/mutation-types';
import MUtil from '../util/mm.js';

const _mm = new MUtil();

class Task {
    GetHRWorks(data) {
        return _mm.requestGet(`${ApiPreFix}/HomeApi/GetHRWorks?Status=${data}`);
    }
    GetUserTasks(data) {
        return _mm.requestGet(`${ApiPreFix}/HomeApi/GetUserTasks?Status=${data}`);
    }
    GetBMTask(data) {
        return _mm.requestGet(`${ApiPreFix}/BM/Tool/GetFlowAllListsJson?Status=${data}`);
    }
}

export default Task;
