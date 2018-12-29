import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import { SET_ASK_FOR_TYPE_LIST, SET_OverTimeWork_TYPE_LIST } from '../../mutation-types';

const initState = {
    AskForLeaveTypeList: [],
    OverTimeWorkTypeList: [],
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
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
