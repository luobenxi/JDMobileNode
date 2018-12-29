import { ApiPreFix } from '../vuex/mutation-types';
import AjaxMUtil from '../axios/index';

const ajax = new AjaxMUtil();

class OverTimeWork {
    GetOverTimeWorkList(data) {
        return ajax.requestGet(`${ApiPreFix}/OverTimeWorkApi/OverTimeWorkList?YYear=${data.condition.YYear}&pageIndex=${data.paging.pageIndex}&pageSize=${data.paging.pageSize}`);
    }
    GetOverTimeWorkByKey(data) {
        return ajax.requestGet(`${ApiPreFix}/OverTimeWorkApi/GetOverTimeWorkByKey?ID=${data}`);
    }
    SaveOverTimeWork(data) {
        return ajax.requestPost(`${ApiPreFix}/OverTimeWorkApi/OverTimeWorkSave`, data);
    }
	DeleteOverTimeWorkByKey(data) {
        return ajax.requestDelete(`${ApiPreFix}/OverTimeWorkApi/DeleteOverTimeWorkByKey?ID=${data}`);
    }
}

export default OverTimeWork;
