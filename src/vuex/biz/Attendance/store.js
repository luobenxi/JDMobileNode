import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import {
    SET_ATTENDANCE_ABNORMAL_LIST
} from '../../mutation-types';

const initState = {
    AttendanceAbnormalList: {
        paging: {},
        itemList: []
    }
};

const mutations = {
    [SET_ATTENDANCE_ABNORMAL_LIST](state, data) {
        Vue.set(state.AttendanceAbnormalList, 'paging', data.paging);
        Vue.set(state.AttendanceAbnormalList, 'itemList', data.itemList);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
