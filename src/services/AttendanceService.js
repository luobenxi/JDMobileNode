import { ApiPreFix } from '../vuex/mutation-types';
import AjaxUtil from '../axios/index';

const ajax = new AjaxUtil();

// 该方式在使用时需要实例化，如 const _user = new User();
class Attendance {
    GetPersonAbnormalList(data) {
        return ajax.requestGet(`${ApiPreFix}/AttendanceApi/PersonAbnormalList?YYear=${data.condition.YYear}&MMonth=${data.condition.MMonth}&Date=${data.condition.Date}&pageIndex=${data.paging.pageIndex}&pageSize=${data.paging.pageSize}`);
    }
    GetPersonAbnormalModelByID(data) {
        return ajax.requestGet(`${ApiPreFix}/AttendanceApi/GetPersonAbnormalModelByID?ID=${data}`);
    }
    ConfirmAttendanceAbnormalReason(data) {
        return ajax.requestGet(`${ApiPreFix}/AttendanceApi/ConfirmAttendanceAbnormalReason?ID=${data.ID}&AbnormalResult=${data.AbnormalResult}`);
    }
}

export default Attendance;
