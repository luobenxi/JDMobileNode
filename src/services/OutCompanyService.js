import { ApiPreFix } from '../vuex/mutation-types';
import MUtil from '../util/mm.js';

const _mm = new MUtil();

class OutCompany {
    GetOutCompanyList(data) {
        return _mm.requestGet(`${ApiPreFix}/OutCompanyApi/OutCompanyList?YYear=${data.condition.YYear}&pageIndex=${data.paging.pageIndex}&pageSize=${data.paging.pageSize}`);
    }
    GetOutCompanyByKey(data) {
        return _mm.requestGet(`${ApiPreFix}/OutCompanyApi/GetOutCompanyByKey?ID=${data}`);
    }
    OutCompanySave(data) {
        return _mm.requestPost(`${ApiPreFix}/OutCompanyApi/OutCompanySave`, data);
    }
    DeleteOutCompanyByKey(data) {
        return _mm.requestDelete(`${ApiPreFix}/OutCompanyApi/DeleteOutCompanyByKey?ID=${data}`);
    }
}

export default OutCompany;
