import OutCompany from '../../../services/OutCompanyService';
import {
    SET_OUT_COMPANY_LIST
} from '../../mutation-types';

const _api = new OutCompany();

// 获取我的公出备案单列表
const GetOutCompanyList = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetOutCompanyList(SubData).then((res) => {
        commit(SET_OUT_COMPANY_LIST, res.data);
        resolve(res.data);
    }).catch(err => {
        reject(err || '');
    })
});

// 获取一条备案单
const GetOutCompanyByKey = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetOutCompanyByKey(SubData).then((res) => {
        resolve(res.data);
    }).catch(err => {
        reject(err || '');
    })
});

// 保存公出备案单
const OutCompanySave = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.OutCompanySave(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

// 删除公出备案单
const DeleteOutCompanyByKey = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.DeleteOutCompanyByKey(SubData).then((res) => {
        resolve(res);
    }).catch(err => {
        reject(err || '');
    })
});

export default {
    GetOutCompanyList,
    GetOutCompanyByKey,
    OutCompanySave,
    DeleteOutCompanyByKey,
};
