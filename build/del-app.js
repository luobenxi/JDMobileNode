/*
参数：模块英文名称
*/
const path = require('path');
const fs = require("fs");
const params = process.argv.splice(2);
if (params.length !== 1) {
    console.log('参数异常，请传入1个参数！');
    console.log('参数说明：模块英文名称');
    process.exit(0);
}
console.log('参数：' + params);
let currentApp = params[0];
let newPath = path.resolve(__dirname, '../src');
// vuex
let writePathVuex = newPath + '/vuex/biz/' + currentApp + '/';
// services
let writePathServices = newPath + '/services/' + currentApp + 'Service.js';
// pages
let writePathPages = newPath + '/pages/' + currentApp + '/';

// 删除操作
DeleteApp();

// 删除模块
function DeleteApp() {
    // 删除模块vuex目录
    fs.exists(writePathVuex, function (exists) {
        if (exists) {
            // 存在就删除
            console.log("开始删除Vuex...");
            deleteFolder(writePathVuex);
            console.log("Vuex删除成功");
        } else {
            console.log("Vuex目录不存在");
        }
    });
// 删除模块services文件
    fs.exists(writePathServices, function (exists) {
        if (exists) {
            // 存在就删除
            console.log("开始删除Services...");
            // unlink 删除文件
            fs.unlink(writePathServices, err => {
                if (!err) {
                    console.log("Services删除成功");
                } else {
                    console.log("Services删除失败");
                }
            });
        } else {
            console.log("Services文件不存在");
        }
    });
// 删除模块pages目录
    fs.exists(writePathPages, function (exists) {
        if (exists) {
            // 存在就删除
            console.log("开始删除Pages...");
            deleteFolder(writePathPages);
            console.log("Pages删除成功");
        } else {
            console.log("Pages目录不存在");
        }
    });
}

// 删除文件夹
function deleteFolder(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}
