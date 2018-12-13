import { ApiPreFix } from '../vuex/mutation-types';
import AjaxUtil from '../axios/index';

const ajax = new AjaxUtil();

class OutCompany {
    GetOutCompanyList(data) {
        return ajax.requestGet(`${ApiPreFix}/OutCompanyApi/OutCompanyList?YYear=${data.condition.YYear}&pageIndex=${data.paging.pageIndex}&pageSize=${data.paging.pageSize}`);
    }
    GetOutCompanyByKey(data) {
        return ajax.requestGet(`${ApiPreFix}/OutCompanyApi/GetOutCompanyByKey?ID=${data}`);
    }
    OutCompanySave(data) {
        return ajax.requestPost(`${ApiPreFix}/OutCompanyApi/OutCompanySave`, data);
    }
    DeleteOutCompanyByKey(data) {
        return ajax.requestDelete(`${ApiPreFix}/OutCompanyApi/DeleteOutCompanyByKey?ID=${data}`);
    }
}

export default OutCompany;
