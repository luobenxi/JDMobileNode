import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import { SET_ASK_FOR_TYPE_LIST, SET_OverTimeWork_TYPE_LIST, NEW_NOTICE_LIST_TOP_10 } from '../../mutation-types';

const initState = {
    AskForLeaveTypeList: [],
    OverTimeWorkTypeList: [],
    NoticeListTop10: [],
};

const mutations = {
    [SET_ASK_FOR_TYPE_LIST](state, data) {
        let newData = data.map((item) => {
            return Object.assign({}, {
                id: item.ID,
                text: item.LeaveName,
            });
        });
        Vue.set(state, 'AskForLeaveTypeList', newData);
    },
    [SET_OverTimeWork_TYPE_LIST](state, data) {
        let newData = data.map((item) => {
            return Object.assign({}, {
                id: item.ID,
                text: item.LeaveName,
            });
        });
        Vue.set(state, 'OverTimeWorkTypeList', newData);
    },
    [NEW_NOTICE_LIST_TOP_10](state, data) {
        Vue.set(state, 'NoticeListTop10', []); // 不显示通知
        // Vue.set(state, 'NoticeListTop10', data.itemList);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
