import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import menus from '../../../menus.json';

import {
    SET_AUTHORITIES,
    ALL_USER_LIST,
} from '../../mutation-types';

const initState = {
    menus,
    MyAuthList: [],
    CustomerList: {
        paging: {},
        itemList: []
    },
    AllUserList: []
};

const mutations = {
    [SET_AUTHORITIES](state, data) {
        Vue.set(state, 'MyAuthList', data);
    },
    [ALL_USER_LIST](state, data) {
        Vue.set(state, 'AllUserList', data);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
