import PublicApi from '../services/PublicApiService';

const publicApi = new PublicApi();

class BizUtil {
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
}

export default BizUtil;
