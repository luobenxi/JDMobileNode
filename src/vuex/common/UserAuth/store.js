import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import menus from '../../../menus.json';

import {
    SET_AUTHORITIES,
    ALL_USER_LIST,
    SET_CURRENT_USER_INFO,
} from '../../mutation-types';

const initState = {
    menus,
    MyAuthList: [],
    CustomerList: {
        paging: {},
        itemList: []
    },
    AllUserList: [],
    UserInfo: {},
};

const mutations = {
    [SET_AUTHORITIES](state, data) {
        Vue.set(state, 'MyAuthList', data);
    },
    [ALL_USER_LIST](state, data) {
        Vue.set(state, 'AllUserList', data);
    },
    [SET_CURRENT_USER_INFO](state, data) {
        let userInfo = Object.assign({}, data, data.user, data.userFile);
        Vue.set(state, 'UserInfo', userInfo);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
