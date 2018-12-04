import Vue from 'vue';
import Router from 'vue-router';
// components
import Layout from '../pages/layout';
import Login from '../pages/login';
import ErrorPage from '../pages/error';
// 首页标签组件
import Home from '../pages/home/home';
import todoList from '../pages/todo/todoList';
import TodoCategory from '../pages/todo/todoCategory';
import My from '../pages/my/my.vue';
// 已办
import DoneCategory from '../pages/todo/doneCategory';
// 通讯录
import Contacts from '../pages/contacts/contacts';
import ContactsUser from '../pages/contacts/contacts-user';
import myContacts from '../pages/contacts/my-contacts';
// 菜单
import Menu from '../pages/menu/menu';
// 个人相关
import ChangePwd from '../pages/my/change-pwd';
import ChangeSalaryPwd from '../pages/Salary/change-salary-pwd';
import UserInfo from '../pages/my/user-info';
// 工资
import SalaryPassValid from '../pages/Salary/SalaryPassValid';
import SalaryBill from '../pages/Salary/SalaryBill';
import SalaryBillDetail from '../pages/Salary/SalaryBillDetail';
// 年假
import AnnualLeaveList from '../pages/AnnualLeave/AnnualLeaveList';
// 考勤
import PersonAbnormalList from '../pages/Attendance/PersonAbnormalList';
import ConfirmReason from '../pages/Attendance/ConfirmReason';
// 公出
import OutCompanyList from '../pages/OutCompany/OutCompanyList';
import OutCompanySave from '../pages/OutCompany/Save';
import OutCompanySubmitConfirm from '../pages/OutCompany/SubmitConfirm';
// 个人档案
import HRUserFilePersonal from '../pages/HRUserFile/HRUserFileList';
Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/',
            redirect: '/home',
            component: Layout,
            children: [
                {
                    path: '/home',
                    component: Home
                },
                {
                    path: '/contacts',
                    component: Contacts
                },
                {
                    path: '/todoCategory',
                    component: TodoCategory
                },
                {
                    path: '/my',
                    component: My
                },
                {
                    path: '/error',
                    component: ErrorPage
                }
            ]
        },
        {
            path: '/doneCategory',
            component: DoneCategory
        },
        {
            path: '/todoList/:CategoryName/:active',
            component: todoList
        },
        {
            path: '/user-info',
            component: UserInfo
        },
        {
            path: '/sub-menu/:ParentID',
            component: Menu
        },
        {
            path: '/change-pwd',
            component: ChangePwd
        },
        {
            path: '/change-salary-pwd',
            component: ChangeSalaryPwd
        },
        {
            path: '/my-contacts',
            component: myContacts
        },
        {
            path: '/contacts-user/:DepartID',
            component: ContactsUser
        },
        {
            path: '/SalaryApi/SalaryPassValid',
            component: SalaryPassValid
        },
        {
            path: '/SalaryApi/SalaryBill',
            component: SalaryBill
        },
        {
            path: '/SalaryApi/SalaryBillDetail',
            component: SalaryBillDetail
        },
        {
            path: '/AnnualLeaveApi/AnnualLeaveList',
            component: AnnualLeaveList
        },
        {
            path: '/AttendanceApi/PersonAbnormalList',
            component: PersonAbnormalList
        },
        {
            path: '/AttendanceApi/ConfirmAbnormalReason/:ID',
            component: ConfirmReason
        },
        {
            path: '/OutCompanyApi/OutCompanyList',
            component: OutCompanyList
        },
        {
            path: '/OutCompanyApi/Save/:ID?',
            component: OutCompanySave
        },
        {
            path: '/OutCompanyApi/SubmitConfirm/:ID?',
            component: OutCompanySubmitConfirm
        },
        {
            path: '/HRUserFilePersonalApi/GetHRUserFilePersonal',
            component: HRUserFilePersonal
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
