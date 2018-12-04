import Attendance from '../../../services/AttendanceService';
import {
    SET_ATTENDANCE_ABNORMAL_LIST
} from '../../mutation-types';

const _api = new Attendance();

// 获取考勤异常列表
const GetAttendanceAbnormalList = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetPersonAbnormalList(SubData).then((res) => {
        commit(SET_ATTENDANCE_ABNORMAL_LIST, res.data);
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

// 根据ID获取一条考勤异常数据
const GetPersonAbnormalModelByID = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetPersonAbnormalModelByID(SubData).then((res) => {
        resolve(res.data);
    }).catch(err => {
        reject(err || '');
    })
});

// 确认考勤异常原因
const ConfirmAttendanceAbnormalReason = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.ConfirmAttendanceAbnormalReason(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

export default {
    GetAttendanceAbnormalList,
    GetPersonAbnormalModelByID,
    ConfirmAttendanceAbnormalReason,
};
