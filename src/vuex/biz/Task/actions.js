import Task from '../../../services/TaskService';
import { TASK_CATEGORY_LIST, TASK_LIST, TASK_CATEGORY_DONE_LIST } from '../../mutation-types';

const _api = new Task();

const GetHRWorks = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetHRWorks(SubData).then((res) => {
        resolve(res.data);
    }).catch(err => {
        reject(err || '');
    })
});

const GetUserTasks = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetUserTasks(SubData).then((res) => {
        resolve(res.data);
    }).catch(err => {
        reject(err || '');
    })
});

const GetBMTask = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    _api.GetBMTask(SubData).then((res) => {
        resolve(res.data);
    }).catch(err => {
        reject(err || '');
    })
});

// 统一设置任务分类列表-待办
const SetTodoCategoryList = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    commit(TASK_CATEGORY_LIST, SubData);
});

// 统一设置任务分类列表-已办
const SetDoneCategoryList = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    commit(TASK_CATEGORY_DONE_LIST, SubData);
});

// 统一设置任务列表
const SetTaskList = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    commit(TASK_LIST, SubData);
});

export default {
    GetHRWorks,
    GetUserTasks,
    GetBMTask,
    SetTodoCategoryList,
    SetDoneCategoryList,
    SetTaskList,
};
