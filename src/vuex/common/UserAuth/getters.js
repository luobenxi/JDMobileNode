const menus = state => state.menus.map(menu => (
    menu.subMenu ?
        Object.assign({}, menu, {
            // subMenu: menu.subMenu.filter(sub => state.MyAuthList.indexOf(sub.key) >= 0)
            subMenu: menu.subMenu,
        }) : menu
    )).filter(menu => menu.subMenu.length > 0);
const MyAuthList = state => state.MyAuthList;
const AllUserList = state => state.AllUserList;
const UserInfo = state => state.UserInfo;

export default {
    menus,
    MyAuthList,
    AllUserList,
    UserInfo,
};
