# jd-mobile-node

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# 项目文件目录说明
--build     webpack打包配置
--config    webpack配置、项目配置
--dist      打包后的目录
--static    静态资源文件
--src       项目核心目录
    --axios       ajax请求的封装
    --components  项目组件
    --pages       项目页面
    --router      项目路由
    --services    服务层
    --style       项目公共样式、页面样式
    --template    自动生成代码的模板
    --util        常用工具
    --vuex        vuex状态管理目录，包括actions，getters，store


    --pages       项目页面
        --AnnualLeave       剩余休假
        --AskForLeave       请假
        --Attendance        考勤异常
        --contacts          通讯录
        --home              首页
        --HRUserFile        员工档案
        --menu              菜单
        --my                我的
        --news              新闻(未使用)
        --OutCompany        公出
        --Salary            工资
        --tode              待办/已办
        --WorkFlow          工作流
        loyout.vue              layout母版页
        error.vue               错误页

    --components    项目组件
        --authUtil          权限验证公共组件 判断按钮是否显示等
        --biz               业务
            --Approve               审批相关组件
            --contacts              通讯录组件
            --home                  首页组件
            --Salary                工资模块组件
        --common            公共
            backTop.vue             返回顶部组件
            datetimePicker.vue      时间选择组件
            file-list.vue           文件列表显示组件(仅显示)
            footer.vue              底部组件
            header.vue              头部组件
            list.vue                列表组件
            search.vue              搜索组件
            upload.vur              文件上传组件(上传附件并显示)
