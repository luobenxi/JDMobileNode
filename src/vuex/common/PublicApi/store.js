import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import { SET_ASK_FOR_TYPE_LIST } from '../../mutation-types';

const initState = {
    AskForLeaveTypeList: []
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
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
