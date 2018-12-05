import { ApiPreFix } from '../vuex/mutation-types';
import MUtil from '../util/mm.js';

const _mm = new MUtil();

class PublicApi {
    GetDictListByParent(data) {
        return _mm.requestGet(`${ApiPreFix}/DictApi/GetDictListByParent?ParentID=${data.ParentID}`);
    }
    GetAskForLeaveTypeList() {
        return _mm.requestGet(`${ApiPreFix}/AskForLeaveTypeApi/GetAllList`);
    }
    UploadFileHandle(data) {
        return _mm.requestPost(`${ApiPreFix}/UploadApi/UploadFileHandle`, data);
    }
}

export default PublicApi;
