import { ApiPreFix } from '../vuex/mutation-types';
import MUtil from '../util/mm.js';

const _mm = new MUtil();

class Test {
    GetTestList(data) {
        return _mm.requestGet(`${ApiPreFix}/TestApi/GetTestList`);
    }
    GetTestByKey(data) {
        return _mm.requestGet(`${ApiPreFix}/TestApi/GetTestByKey?ID=${data}`);
    }
    SaveTest(data) {
        return _mm.requestPost(`${ApiPreFix}/TestApi/SaveTest`, data);
    }
	DeleteTestByKey(data) {
        return _mm.requestDelete(`${ApiPreFix}/TestApi/DeleteTestByKey?ID=${data}`);
    }
}

export default Test;
