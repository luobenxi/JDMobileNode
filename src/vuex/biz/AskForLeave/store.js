import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import { SET_ASK_FOR_LEAVE_LIST } from '../../mutation-types';

const initState = {
    AskForLeaveList: {
        paging: {},
        itemList: []
    }
};

const mutations = {
    [SET_ASK_FOR_LEAVE_LIST](state, data) {
        Vue.set(state.AskForLeaveList, 'paging', data.paging);
        Vue.set(state.AskForLeaveList, 'itemList', data.itemList);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
