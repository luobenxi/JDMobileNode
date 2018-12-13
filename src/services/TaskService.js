import { ApiPreFix } from '../vuex/mutation-types';
import AjaxUtil from '../axios/index';

const ajax = new AjaxUtil();

class Task {
    GetHRWorks(data) {
        return ajax.requestGet(`${ApiPreFix}/HomeApi/GetHRWorks?Status=${data}`);
    }
    GetUserTasks(data) {
        return ajax.requestGet(`${ApiPreFix}/HomeApi/GetUserTasks?Status=${data}`);
    }
    GetBMTask(data) {
        return ajax.requestGet(`${ApiPreFix}/BM/Tool/GetFlowAllListsJson?Status=${data}`);
    }
}

export default Task;
