import Vue from 'vue';
import Router from 'vue-router';

// 非按需加载
// import Layout from '../pages/layout';
// 按需加载方式一，官方推荐使用的方式
// const AskForLeaveList = () => import('../pages/AskForLeave/AskForLeaveList');
// 按需加载方式二
// const AskForLeaveList = resolve => require(['../pages/AskForLeave/AskForLeaveList'], resolve);

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/test',
            component: () => import('../pages/Test/TestList')
        },
        {
            path: '/login',
            component: () => import('../pages/login')
        },
        {
            path: '/',
            redirect: '/home',
            component: () => import('../pages/layout'),
            children: [
                {
                    path: '/home',
                    component: () => import('../pages/home/home')
                },
                {
                    path: '/contacts',
                    component: () => import('../pages/contacts/contacts')
                },
                {
                    path: '/todoCategory',
                    component: () => import('../pages/todo/todoCategory')
                },
                {
                    path: '/my',
                    component: () => import('../pages/my/my')
                },
                {
                    path: '/error',
                    component: () => import('../pages/error')
                }
            ]
        },
        {
            path: '/doneCategory',
            component: () => import('../pages/todo/doneCategory')
        },
        {
            path: '/todoList/:CategoryName/:active',
            component: () => import('../pages/todo/todoList')
        },
        {
            path: '/user-info',
            component: () => import('../pages/my/user-info')
        },
        {
            path: '/sub-menu/:ParentID',
            component: () => import('../pages/menu/menu')
        },
        {
            path: '/change-pwd',
            component: () => import('../pages/my/change-pwd')
        },
        {
            path: '/change-salary-pwd',
            component: () => import('../pages/Salary/change-salary-pwd')
        },
        {
            path: '/my-contacts',
            component: () => import('../pages/contacts/my-contacts')
        },
        {
            path: '/contacts-user/:DepartID',
            component: () => import('../pages/contacts/contacts-user')
        },
        {
            path: '/SalaryApi/SalaryPassValid',
            component: () => import('../pages/Salary/SalaryPassValid')
        },
        {
            path: '/SalaryApi/SalaryBill',
            component: () => import('../pages/Salary/SalaryBill')
        },
        {
            path: '/SalaryApi/SalaryBillDetail',
            component: () => import('../pages/Salary/SalaryBillDetail')
        },
        {
            path: '/AnnualLeaveApi/AnnualLeaveList',
            component: () => import('../pages/AnnualLeave/AnnualLeaveList')
        },
        {
            path: '/AttendanceApi/PersonAbnormalList',
            component: () => import('../pages/Attendance/PersonAbnormalList')
        },
        {
            path: '/AttendanceApi/ConfirmAbnormalReason/:ID',
            component: () => import('../pages/Attendance/ConfirmReason')
        },
        {
            path: '/OutCompanyApi/OutCompanyList',
            component: () => import('../pages/OutCompany/OutCompanyList')
        },
        {
            path: '/OutCompanyApi/Save/:ID?',
            component: () => import('../pages/OutCompany/Save')
        },
        {
            path: '/OutCompanyApi/SubmitConfirm/:ID?',
            component: () => import('../pages/OutCompany/SubmitConfirm')
        },
        {
            path: '/HRUserFilePersonalApi/GetHRUserFilePersonal',
            component: () => import('../pages/HRUserFile/HRUserFileList')
        },
        {
            path: '/AskForLeaveApi/PersonAskForLeaveList',
            component: () => import('../pages/AskForLeave/AskForLeaveList')
        },
        {
            path: '/AskForLeaveApi/Save/:ID?',
            component: () => import('../pages/AskForLeave/Save')
        },
        {
            path: '/AskForLeave/PersonAskForLeaveSubmit/:ID?',
            component: () => import('../pages/AskForLeave/PersonAskForLeaveSubmit') // 提交前确认页面
        },
        {
            path: '/AskForLeave/PersonAskForLeaveApproval/:wfDetailId?', // 接口返回的url，所有没有使用 *Api
            component: () => import('../pages/AskForLeave/PersonAskForLeaveApproval')
        },
        {
            path: '/AskForLeave/PersonAskForLeaveApprovalHR/:wfDetailId?', // 接口返回的url，所有没有使用 *Api
            component: () => import('../pages/AskForLeave/PersonAskForLeaveApprovalHR')
        },
        {
            path: '/AskForLeave/PersonAskForLeaveView/:ID?',
            component: () => import('../pages/AskForLeave/PersonAskForLeaveView')
        },
        // 销假相关
        {
            path: '/AskForLeave/AskForLeaveCancelEdit/:ID?',
            component: () => import('../pages/AskForLeaveCancel/AskForLeaveCancelEdit')
        },
        {
            path: '/AskForLeave/AskForLeaveCancelApprovalView/:ID?', // 销假单ID
            component: () => import('../pages/AskForLeaveCancel/AskForLeaveCancelApprovalView')
        },
        {
            path: '/AskForLeaveCancel/AskForLeaveCancelApproval/:wfDetailId?', // 接口返回的url，所有没有使用 *Api
            component: () => import('../pages/AskForLeaveCancel/AskForLeaveCancelApproval')
        },
        {
            path: '/AskForLeaveCancel/AskForLeaveCancelApprovalHR/:wfDetailId?', // 接口返回的url，所有没有使用 *Api
            component: () => import('../pages/AskForLeaveCancel/AskForLeaveCancelApprovalHR')
        }
    ],
    // mode: 'history'
    mode: 'hash'
});

router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
        next('/');
    } else {
        next();
    }
});

export default router;
