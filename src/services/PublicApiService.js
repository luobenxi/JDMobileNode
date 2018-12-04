import { ApiPreFix } from '../vuex/mutation-types';
import MUtil from '../util/mm.js';

const _mm = new MUtil();

class PublicApi {
    GetDictListByParent(data) {
        return _mm.requestGet(`${ApiPreFix}/DictApi/GetDictListByParent?ParentID=${data.ParentID}`);
    }
}

export default PublicApi;
