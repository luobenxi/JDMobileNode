import Vue from 'vue';
import Vuex from 'vuex';

import PublicApiStore from './common/PublicApi/store';
import UserAuthStore from './common/UserAuth/store';
import TaskStore from './biz/Task/store';
import SalaryStore from './biz/Salary/store';
import AnnualLeaveStore from './biz/AnnualLeave/store';
import AttendanceStore from './biz/Attendance/store';
import OutCompanyStore from './biz/OutCompany/store';
import OverTimeWorkStore from './biz/OverTimeWork/store';
import HRUserFilePersonalStore from './biz/HRUserFile/store';
import AskForLeaveStore from './biz/AskForLeave/store';
import WorkFlowStore from './biz/WorkFlow/store';
import TestStore from './biz/Test/store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        PublicApiStore,
        UserAuthStore,
        TaskStore,
        SalaryStore,
        AnnualLeaveStore,
        AttendanceStore,
        OutCompanyStore,
        OverTimeWorkStore,
        HRUserFilePersonalStore,
        AskForLeaveStore,
        WorkFlowStore,
        TestStore,
    },
    strict: process.env.NODE_ENV !== 'production',
});
