import { ApiPreFix } from '../vuex/mutation-types';
import AjaxUtil from '../axios/index';

const _mm = new AjaxUtil();

// 该方式在使用时需要实例化，如 const _user = new User();
class User {
    GetPersonWorkAnnualLeaveList() {
        return _mm.requestGet(`${ApiPreFix}/AnnualLeaveApi/AnnualLeaveList`);
    }
}

export default User;
