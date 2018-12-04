import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import {
    SET_OUT_COMPANY_LIST
} from '../../mutation-types';

const initState = {
    OutCompanyList: {
        paging: {},
        itemList: []
    }
};

const mutations = {
    [SET_OUT_COMPANY_LIST](state, data) {
        Vue.set(state.OutCompanyList, 'paging', data.paging);
        Vue.set(state.OutCompanyList, 'itemList', data.itemList);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
