import { ApiPreFix } from '../vuex/mutation-types';
import MUtil from '../util/mm.js';

const _mm = new MUtil();

// 该方式在使用时需要实例化，如 const _user = new User();
class User {
    GetPersonWorkAnnualLeaveList() {
        return _mm.requestGet(`${ApiPreFix}/AnnualLeaveApi/AnnualLeaveList`);
    }
}

export default User;
