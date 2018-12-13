import PublicApi from '../services/PublicApiService';
import User from '../services/UserAuthService';
import MUtil from '../util/mm.js';

const _mm = new MUtil();
const userAuthApi = new User();
const publicApi = new PublicApi();

class BizUtil {
    checkIsLogin() {
        let Cookie = _mm.getCookie(_mm.CookieKeys_UserInfo());
        if (!Cookie) {
            _mm.errorTips('请先登录');
            // 获取微信OpenID地址连接
            userAuthApi.GetWeiXinOpenIDUrl().then((res) => {
                window.location.href = res.data;
            });
        }
    }

    SplitDateToArr(date) {
        let arr = date.split('-');
        let dataArr = {
            YYear: arr[0],
            MMonth: arr[1],
            DDay: arr[2]
        };
        return dataArr;
    }

    GetAskTypeOption() {
        let list = [];
        publicApi.GetAskForLeaveTypeList().then((res) => {
            res.data.map((item) => {
                let temp = Object.assign({}, {
                    id: item.ID,
                    text: item.LeaveName,
                });
                list.push(temp);
            });
        });
        return list;
    }

    GetAmPmTypeOption() {
        return [
            {
                id: 1,
                text: '全天'
            },
            {
                id: 2,
                text: '上午'
            },
            {
                id: 3,
                text: '下午'
            }
        ]
    }

    getAllUserInfoFromLocal() {
        let userStr = _mm.getStorage('user.info');
        return userStr ? JSON.parse(userStr) : '';
    }

    getAllUserInfoFromApiOrLocalPromise() {
        return new Promise((resolve, reject) => {
            // let userInfo = this.getAllUserInfoFromLocal();
            // if (userInfo.user === undefined || userInfo.userFile === undefined) {
            //     userAuthApi.GetUserInfo().then((user) => {
            //         _mm.setStorage('user.info', user.data);
            //         userInfo = this.getAllUserInfoFromLocal();
            //         resolve(userInfo);
            //     });
            // } else {
            //     resolve(userInfo);
            // }
            userAuthApi.GetUserInfo().then((user) => {
                _mm.setStorage('user.info', user.data);
                let userInfo = this.getAllUserInfoFromLocal();
                resolve(userInfo);
            });
        });
    }

    // 审批状态码映射
    JDApproveStatusMap(id) {
        let text = '';
        switch (id) {
            case '61':
                text = '未提交';
                break;
            case '62':
                text = '审批中';
                break;
            case '63':
                text = '已通过';
                break;
            case '64':
                text = '已拒绝';
                break;
            case '65':
                text = '退回';
                break;
            case '66':
                text = '挂起';
                break;
            case '67':
                text = '撤回';
                break;
            case null:
                text = '未审批';
                break;
            default:
                text = '未知';
        }
        return text;
    }
}

export default BizUtil;
