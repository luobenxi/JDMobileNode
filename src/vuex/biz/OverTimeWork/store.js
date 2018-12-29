import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import {
    SET_OverTimeWork_LIST
} from '../../mutation-types';

const initState = {
    OverTimeWorkList: {
        paging: {},
        itemList: []
    }
};

const mutations = {
    [SET_OverTimeWork_LIST](state, data) {
        Vue.set(state.OverTimeWorkList, 'paging', data.paging);
        Vue.set(state.OverTimeWorkList, 'itemList', data.itemList);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
