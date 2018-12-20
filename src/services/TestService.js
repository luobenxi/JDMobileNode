import AjaxMUtil from '../axios/index';

const ajax = new AjaxMUtil();
const baseURL = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';

class Test {
    GetTestList() {
        return ajax.request({url: `${baseURL}/user/list`});
    }
}

export default Test;
