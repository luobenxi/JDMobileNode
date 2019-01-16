import { ApiPreFix } from '../vuex/mutation-types';
import AjaxUtil from '../axios/index';

const ajax = new AjaxUtil();

class PublicApi {
    UploadFileHandle(data) {
        return ajax.requestPost(`${ApiPreFix}/UploadApi/UploadFileHandle`, data);
    }
    GetDictListByParent(data) {
        return ajax.requestGet(`${ApiPreFix}/DictApi/GetDictListByParent?ParentID=${data.ParentID}`);
    }
    GetAskForLeaveTypeList() {
        return ajax.requestGet(`${ApiPreFix}/PublicTypeApi/GetAskForLeaveTypeList`);
    }
    GetOverTimeWorkTypeList() {
        return ajax.requestGet(`${ApiPreFix}/PublicTypeApi/GetOverTimeWorkTypeList`);
    }
    GetNoticeListTop10() {
        return ajax.requestGet(`${ApiPreFix}/PublicApi/GetNoticeListTop10`);
    }
    GetArticleByKey(ID) {
        return ajax.requestGet(`${ApiPreFix}/ArtSys/ArticleSystem/GetArticleByKey?ID=${ID}`);
    }
}

export default PublicApi;
