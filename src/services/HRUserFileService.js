import { ApiPreFix } from '../vuex/mutation-types';
import AjaxUtil from '../axios/index';

const _mm = new AjaxUtil();

class HRUserFile {
    GetHRUserFilePersonal() {
        return _mm.requestGet(`${ApiPreFix}/HRUserFilePersonalApi/GetHRUserFilePersonal`);
    }
}

export default HRUserFile;
