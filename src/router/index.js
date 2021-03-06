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
            path: '/reset-salary-pwd',
            component: () => import('../pages/Salary/reset-salary-pwd')
        },
        {
            path: '/my-contacts',
            component: () => import('../pages/contacts/my-contacts')
        },
        {
            path: '/contacts-user/:DepartID',
            component: () => import('../pages/contacts/contacts-user')
        },
        // 通知
        {
            path: '/notice/list',
            component: () => import('../pages/notice/list')
        },
        {
            path: '/notice/detail/:ID',
            component: () => import('../pages/notice/detail')
        },
        // 个人档案-已发布
        {
            path: '/HRUserFilePersonalApi/GetHRUserFilePersonal',
            component: () => import('../pages/HRUserFile/HRUserFileList')
        },
        // 工资-已发布
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
        // 剩余休假-已发布
        {
            path: '/AnnualLeaveApi/AnnualLeaveList',
            component: () => import('../pages/AnnualLeave/AnnualLeaveList')
        },
        // 考勤异常-已发布
        {
            path: '/AttendanceApi/PersonAbnormalList',
            component: () => import('../pages/Attendance/PersonAbnormalList')
        },
        {
            path: '/AttendanceApi/ConfirmAbnormalReason/:ID',
            component: () => import('../pages/Attendance/ConfirmReason')
        },
        // 公出相关-未发布
        // 发布的时候只需要将移动端的权限URL配置为该链接就可以
        {
            path: '/OutCompanyApi/OutCompanyList',
            component: () => import('../pages/OutCompany/List')
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
            path: '/OutCompanyApi/View/:ID',
            component: () => import('../pages/OutCompany/View')
        },
        {
            path: '/OutCompanyApi/OutCompanyApproval/:wfDetailId?', // 加上Api是因为要发布
            component: () => import('../pages/OutCompany/Approval')
        },
        // 请假相关-未发布
        // 发布的时候只需要将移动端的权限URL配置为该链接就可以
        {
            path: '/AskForLeaveApi/PersonAskForLeaveList',
            component: () => import('../pages/AskForLeave/AskForLeaveList')
        },
        {
            path: '/AskForLeave/Save/:ID?',
            component: () => import('../pages/AskForLeave/Save')
        },
        {
            path: '/AskForLeave/PersonAskForLeaveSubmit/:ID?',
            component: () => import('../pages/AskForLeave/PersonAskForLeaveSubmit')
        },
        {
            path: '/AskForLeaveApi/PersonAskForLeaveApproval/:wfDetailId?', // 加上Api是因为要发布
            component: () => import('../pages/AskForLeave/PersonAskForLeaveApproval')
        },
        {
            path: '/AskForLeaveApi/PersonAskForLeaveApprovalHR/:wfDetailId?', // 加上Api是因为要发布
            component: () => import('../pages/AskForLeave/PersonAskForLeaveApprovalHR')
        },
        {
            path: '/AskForLeaveApi/PersonAskForLeaveView/:ID?', // 加上Api是因为要发布
            component: () => import('../pages/AskForLeave/PersonAskForLeaveView')
        },
        // 销假相关-未发布
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
        },
        // 加班相关-未发布
        // 发布的时候只需要将移动端的权限URL配置为该链接就可以
        {
            path: '/OverTimeWorkApi/PersonOverTimeWorkList',
            component: () => import('../pages/OverTimeWork/List')
        },
        {
            path: '/OverTimeWork/Save/:ID?',
            component: () => import('../pages/OverTimeWork/Save')
        },
        {
            path: '/OverTimeWork/SubmitConfirm/:ID?',
            component: () => import('../pages/OverTimeWork/SubmitConfirm')
        },
        {
            path: '/OverTimeWorkApi/View/:ID?', // 加上Api是因为要发布
            component: () => import('../pages/OverTimeWork/View')
        },
        {
            path: '/OverTimeWorkApi/PersonOverTimeWorkApproval/:wfDetailId?', // 加上Api是因为要发布
            component: () => import('../pages/OverTimeWork/Approval')
        },
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
