import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import { TASK_CATEGORY_LIST, TASK_LIST, TASK_CATEGORY_DONE_LIST } from '../../mutation-types';

const initState = {
    todoCategoryList: [],
    doneCategoryList: [],
    TaskList: [],
};

const mutations = {
    [TASK_CATEGORY_LIST](state, data) {
        Vue.set(state, 'todoCategoryList', data);
    },
    [TASK_CATEGORY_DONE_LIST](state, data) {
        Vue.set(state, 'doneCategoryList', data);
    },
    [TASK_LIST](state, data) {
        Vue.set(state, 'TaskList', data);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
