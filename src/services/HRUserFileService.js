import { ApiPreFix } from '../vuex/mutation-types';
import AjaxUtil from '../axios/index';

const ajax = new AjaxUtil();

class HRUserFile {
    GetHRUserFilePersonal() {
        return ajax.requestGet(`${ApiPreFix}/HRUserFilePersonalApi/GetHRUserFilePersonal`);
    }
}

export default HRUserFile;
