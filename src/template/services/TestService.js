import { ApiPreFix } from '../vuex/mutation-types';
import AjaxMUtil from '../axios/index';

const ajax = new AjaxMUtil();

class Test {
    GetTestList(data) {
        return ajax.requestGet(`${ApiPreFix}/TestApi/GetTestList`);
    }
    GetTestByKey(data) {
        return ajax.requestGet(`${ApiPreFix}/TestApi/GetTestByKey?ID=${data}`);
    }
    SaveTest(data) {
        return ajax.requestPost(`${ApiPreFix}/TestApi/SaveTest`, data);
    }
	DeleteTestByKey(data) {
        return ajax.requestDelete(`${ApiPreFix}/TestApi/DeleteTestByKey?ID=${data}`);
    }
}

export default Test;
