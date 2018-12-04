import { ApiPreFix } from '../vuex/mutation-types';
import MUtil from '../util/mm.js';

const _mm = new MUtil();

class HRUserFile {
    GetHRUserFilePersonal() {
        return _mm.requestGet(`${ApiPreFix}/HRUserFilePersonalApi/GetHRUserFilePersonal`);
    }
}

export default HRUserFile;
