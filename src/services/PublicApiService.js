import { ApiPreFix } from '../vuex/mutation-types';
import AjaxUtil from '../axios/index';

const ajax = new AjaxUtil();

class PublicApi {
    GetDictListByParent(data) {
        return ajax.requestGet(`${ApiPreFix}/DictApi/GetDictListByParent?ParentID=${data.ParentID}`);
    }
    GetAskForLeaveTypeList() {
        return ajax.requestGet(`${ApiPreFix}/AskForLeaveTypeApi/GetAllList`);
    }
    UploadFileHandle(data) {
        return ajax.requestPost(`${ApiPreFix}/UploadApi/UploadFileHandle`, data);
    }
}

export default PublicApi;
