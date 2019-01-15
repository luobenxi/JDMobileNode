import PublicApi from '../services/PublicApiService';
import User from '../services/UserAuthService';
import MUtil from '../util/mm.js';

const _mm = new MUtil();
const userAuthApi = new User();
const publicApi = new PublicApi();

class BizUtil {
    getOutCompanyReasonParentID() {
        return 542; // 字典表ID=542的记录为公出原因
    }

    checkIsLogin() {
        let Cookie = _mm.getCookie(_mm.CookieKeys_UserInfo());
        if (!Cookie) {
            _mm.errorTips('请先登录');
            // 获取微信OpenID地址连接
            userAuthApi.GetWeiXinOpenIDUrl().then((res) => {
                // 正式环境需要打开注释
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
        // publicApi.GetAskForLeaveTypeList().then((res) => {
        //     res.data.map((item) => {
        //         let temp = Object.assign({}, {
        //             id: item.ID,
        //             text: item.LeaveName,
        //         });
        //         list.push(temp);
        //     });
        // });
        return list;
    }

    GetAskTypeOptionPromise() {
        let list = [];
        return new Promise((resolve, reject) => {
            publicApi.GetAskForLeaveTypeList().then((res) => {
                res.data.map((item) => {
                    let temp = Object.assign({}, {
                        id: item.ID,
                        text: item.LeaveName,
                    });
                    list.push(temp);
                });
                resolve(list);
            }).catch(err => {
                reject(err);
            });
        });
    }

    // 需要选择日期区间的请假类型，其余的均为正常选择时间
    GetNeedDateBetweenAskTypeIdList() {
        return [
            {
                id: 3,
                text: '婚假'
            },
            {
                id: 6,
                text: '产假'
            },
            {
                id: 10,
                text: '计划生育假'
            },
            {
                id: 14,
                text: '陪产假'
            },
            {
                id: 18,
                text: '哺乳假'
            },
        ];
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
            case '68':
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

    getOutOrInOption() {
        return [
            {
                id: '1',
                text: '公司内加班'
            },
            {
                id: '0',
                text: '公司外加班'
            }
        ]
    }

}

export default BizUtil;
