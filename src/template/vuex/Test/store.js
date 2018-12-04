import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import {
    SET_TEST_LIST
} from '../../mutation-types';

const initState = {
    TestList: {
        paging: {},
        itemList: []
    }
};

const mutations = {
    [SET_TEST_LIST](state, data) {
        Vue.set(state.TestList, 'paging', data.paging);
        Vue.set(state.TestList, 'itemList', data.itemList);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
