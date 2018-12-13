import { ApiPreFix } from '../vuex/mutation-types';
import AjaxUtil from '../axios/index';

const ajax = new AjaxUtil();

class Salary {
    salaryPassCheckHandle(data) {
        return ajax.requestGet(`${ApiPreFix}/SalaryApi/SalaryPassValidHandle?SalaryPass=${data.SalaryPass}`);
    }
    GetUserSalaryMonthBill(data) {
        return ajax.requestGet(`${ApiPreFix}/SalaryApi/GetUserSalaryMonthBill?YYear=${data.YYear}&MMonth=${data.MMonth}`);
    }
    GetUserYearBonusBill(data) {
        return ajax.requestGet(`${ApiPreFix}/SalaryApi/GetUserYearBonusBill?YYear=${data.YYear}&MMonth=${data.MMonth}`);
    }
    GetUserSalaryChangeBill(data) {
        return ajax.requestGet(`${ApiPreFix}/SalaryApi/GetUserSalaryChangeBill?YYear=${data.YYear}`);
    }
}

export default Salary;
