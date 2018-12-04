/*
参数：第一个参数为模块英文名称，第二个参数为模块中文名字
*/
const path = require('path');
const fs = require("fs");
const params = process.argv.splice(2);
if (params.length !== 2) {
    console.log('参数异常，请传入两个参数！');
    console.log('参数说明：第一个参数为模块英文名称，第二个参数为模块中文名字');
    process.exit(0);
}

console.log("开始自动生成代码...");
console.log('参数：' + params);

let currentApp = params[0];
let currentAppZh = params[1];

let newPath = path.resolve(__dirname, '../src');

// vuex
let readPathVuex = newPath + '/template/vuex/Test/';
let writePathVuex = newPath + '/vuex/biz/' + currentApp + '/';

// services
let readPathServices = newPath + '/template/services/TestService.js';
let writePathServices = newPath + '/services/' + currentApp + 'Service.js';

// pages
let readPathPages = newPath + '/template/pages/Test.vue';
let writePathPages = newPath + '/pages/' + currentApp + '/';

// 生成模块
AddApp();

// 生成模块目录并写入
function AddApp() {
    fs.exists(writePathVuex, function (exists) {
        if (!exists) {
            fs.mkdir(writePathVuex, err => {
                if (!err) {
                    // 目录创建成功
                    console.log('vuex目录创建成功');
                    // 1、读取模板actions.js并写入
                    fs.readFile(readPathVuex + 'actions.js', function (err, data) {
                        if (err) {
                            return console.error(err);
                        }
                        let dataStr = data.toString();
                        console.log("actions.js读取成功");
                        console.log("actions.js开始写入...");
                        let newData = dataStr.replace(/Test/gi, currentApp);
                        newData = newData.replace(/测试/gi, currentAppZh);
                        fs.writeFile(writePathVuex + 'actions.js', newData, function (err) {
                            if (err) {
                                return console.error(err);
                            }
                            console.log("actions.js文件写入成功");
                        });
                    });
                    // 2、读取模板store.js并写入
                    fs.readFile(readPathVuex + 'store.js', function (err, data) {
                        if (err) {
                            return console.error(err);
                        }
                        let dataStr = data.toString();
                        console.log("store.js读取成功");
                        console.log("store.js开始写入...");
                        let newData = dataStr.replace(/Test/gi, currentApp);
                        fs.writeFile(writePathVuex + 'store.js', newData, function (err) {
                            if (err) {
                                return console.error(err);
                            }
                            console.log("store.js文件写入成功");
                        });
                    });
                    // 3、读取模板getters.js并写入
                    fs.readFile(readPathVuex + 'getters.js', function (err, data) {
                        if (err) {
                            return console.error(err);
                        }
                        let dataStr = data.toString();
                        console.log("getters.js读取成功");
                        console.log("getters.js开始写入...");
                        let newData = dataStr.replace(/Test/gi, currentApp);
                        fs.writeFile(writePathVuex + 'getters.js', newData, function (err) {
                            if (err) {
                                return console.error(err);
                            }
                            console.log("getters.js文件写入成功");
                        });
                    });
                    // 4、读取services并写入
                    fs.readFile(readPathServices, function (err, data) {
                        if (err) {
                            return console.error(err);
                        }
                        let dataStr = data.toString();
                        console.log("services读取成功");
                        console.log("services开始写入...");
                        let newData = dataStr.replace(/Test/gi, currentApp);
                        fs.writeFile(writePathServices, newData, function (err) {
                            if (err) {
                                return console.error(err);
                            }
                            console.log("services写入成功");
                        });
                    });
                    // 5、读取pages并写入
                    fs.mkdir(writePathPages, err => {
                        if (!err) {
                            // 目录创建成功
                            console.log('pages目录创建成功');
                            fs.readFile(readPathPages, function (err, data) {
                                if (err) {
                                    return console.error(err);
                                }
                                let dataStr = data.toString();
                                console.log("pages读取成功");
                                console.log("pages开始写入...");
                                let newData = dataStr.replace(/Test/gi, currentApp);
                                fs.writeFile(writePathPages + currentApp + 'List.vue', newData, function (err) {
                                    if (err) {
                                        return console.error(err);
                                    }
                                    console.log("pages写入成功");
                                });
                            });
                        } else {
                            console.log('pages目录创建失败，请手动创建后重新执行');
                        }
                    });
                } else {
                    console.log('vuex目录创建失败，请手动创建后重新执行');
                }
            });
        } else {
            console.log('vuex目录已存在');
        }
    });
}
