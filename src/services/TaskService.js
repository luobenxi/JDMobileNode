import { ApiPreFix } from '../vuex/mutation-types';
import AjaxUtil from '../axios/index';

const ajax = new AjaxUtil();

class Task {
    GetHRWorks(data) {
        return ajax.requestGet(`${ApiPreFix}/HomeApi/GetHRWorks?Status=${data}`);
    }
    GetUserTasks(data) {
        return ajax.requestGet(`${ApiPreFix}/HomeApi/GetUserTasks?Status=${data}`, false); // false 不显示loading效果
    }
    GetBMTask(data) {
        return ajax.requestGet(`${ApiPreFix}/BM/Tool/GetFlowAllListsJson?Status=${data}`, false); // false 不显示loading效果
    }
}

export default Task;
