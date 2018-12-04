import Salary from '../../../services/SalaryService';
import {
    SET_SALARY_PASS_VALID
} from '../../mutation-types';

const api = new Salary();

// 工资查询密码验证
const salaryPassCheck = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    api.salaryPassCheckHandle(SubData).then((res) => {
        if (res.success) {
            commit(SET_SALARY_PASS_VALID, true);
            resolve(res);
        } else {
            reject(res);
        }
    });
});

// 获取个人月工资单
const GetUserSalaryMonthBill = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    api.GetUserSalaryMonthBill(SubData).then((res) => {
        if (res.success) {
            resolve(res.data || null);
        } else {
            reject(res);
        }
    });
});

// 获取个人年终奖单
const GetUserYearBonusBill = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    api.GetUserYearBonusBill(SubData).then((res) => {
        if (res.success) {
            resolve(res.data || null);
        } else {
            reject(res);
        }
    });
});

// 获取个人年度调薪单
const GetUserSalaryChangeBill = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    api.GetUserSalaryChangeBill(SubData).then((res) => {
        if (res.success) {
            resolve(res.data || null);
        } else {
            reject(res);
        }
    });
});

export default {
    salaryPassCheck,
    GetUserSalaryMonthBill,
    GetUserYearBonusBill,
    GetUserSalaryChangeBill,
};
