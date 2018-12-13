import { ApiPreFix } from '../vuex/mutation-types';
import AjaxUtil from '../axios/index';

const _mm = new AjaxUtil();

class Salary {
    salaryPassCheckHandle(data) {
        return _mm.requestGet(`${ApiPreFix}/SalaryApi/SalaryPassValidHandle?SalaryPass=${data.SalaryPass}`);
    }
    GetUserSalaryMonthBill(data) {
        return _mm.requestGet(`${ApiPreFix}/SalaryApi/GetUserSalaryMonthBill?YYear=${data.YYear}&MMonth=${data.MMonth}`);
    }
    GetUserYearBonusBill(data) {
        return _mm.requestGet(`${ApiPreFix}/SalaryApi/GetUserYearBonusBill?YYear=${data.YYear}&MMonth=${data.MMonth}`);
    }
    GetUserSalaryChangeBill(data) {
        return _mm.requestGet(`${ApiPreFix}/SalaryApi/GetUserSalaryChangeBill?YYear=${data.YYear}`);
    }
}

export default Salary;
