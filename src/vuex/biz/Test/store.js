import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import {TEST_LIST} from '../../mutation-types';

const initState = {
    testList: {}
};

const mutations = {
    [TEST_LIST](state, data) {
        Vue.set(state, 'testList', data);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
