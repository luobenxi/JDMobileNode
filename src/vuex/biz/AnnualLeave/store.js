import Vue from 'vue';
import actions from './actions';
import getters from './getters';

import {
    SET_SALARY_PASS_VALID,
} from '../../mutation-types';

const initState = {
    SalaryPassValidStatus: false,
};

const mutations = {
    [SET_SALARY_PASS_VALID](state, data) {
        Vue.set(state, 'SalaryPassValidStatus', data);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
