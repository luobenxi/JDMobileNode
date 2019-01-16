const path = require('path');
const fs = require("fs");
const encoding = require("encoding");
let readFilePath = path.resolve(__dirname, '../dist/static/');
let readFilePathIndexHtml = path.resolve(__dirname, '../dist/index.html');
// 写在当前路径
let writeFilePathIndexHtmlCureent = path.resolve(__dirname, '../dist/index.cshtml');
let writeFilePathPublic = 'D:\\VS2012Projects\\SVN\\JDHR\\JDCRM.Web\\';
let writeFilePath = writeFilePathPublic + 'static\\';
let writeFileBakPath = writeFilePathPublic + 'static-bak\\';
let writeFilePathIndexHtml = writeFilePathPublic + 'Views\\Mobile\\';
let writeFileBakPathHtml = writeFilePathPublic + 'Views\\Mobile-bak\\';

console.log('项目打包路径：' + readFilePath);
console.log('项目部署路径：' + writeFilePath);

let date = new Date();
let filePath = date.getTime();
let bakPath = writeFileBakPath + filePath;
let bakPathHtml = writeFileBakPathHtml + filePath;

// 自动发布
// AuthPublish();
// 写入index.cshtml文件
AddIndexHtml();

// 自动发布
function AuthPublish() {
// **************开始发布**************
// 备份原来的文件
// 备份static
    fs.exists(writeFileBakPath, function (exists) {
        if (!exists) {
            fs.mkdir(writeFileBakPath);
        }
        fs.exists(bakPath, function (exists) {
            if (!exists) {
                fs.mkdir(bakPath);
            }
            // copy static Folder
            copyFolder(writeFilePath, bakPath, function(err) {
                if (!err) {
                    console.log('bak static Folder ok');
                    // 备份index.cshtml文件
                    fs.exists(writeFileBakPathHtml, function (exists) {
                        if (!exists) {
                            fs.mkdir(writeFileBakPathHtml);
                        }
                        fs.exists(bakPathHtml, function (exists) {
                            if (!exists) {
                                fs.mkdir(bakPathHtml);
                            }
                            // copy Mobile Folder
                            copyFolder(writeFilePathIndexHtml, bakPathHtml, function (err) {
                                if (!err) {
                                    console.log('bak Mobile Folder ok');
                                    // 删除原来的文件
                                    deleteFolder(writeFilePath);
                                    // 判断项目部署路径是否存在，不存在则创建，并复制文件及文件夹
                                    fs.exists(writeFilePath, function (exists) {
                                        if (!exists) {
                                            fs.mkdir(writeFilePath);
                                            // 复制打包后的文件至项目部署路径
                                            copyFolder(readFilePath, writeFilePath, function(err) {
                                                if (!err) {
                                                    console.log('copy static Folder success');
                                                    // 写入index.cshtml文件
                                                    AddIndexHtml();
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        });
                    });
                }
            });
        });
    });
}

// 写入index.cshtml文件
function AddIndexHtml() {
    fs.readFile(readFilePathIndexHtml, function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("index.html读取成功");
        console.log("index.cshtml开始写入...");
        var resultBuffer = encoding.convert(data, "GBK"); // GB2312
        fs.writeFile(writeFilePathIndexHtmlCureent, resultBuffer, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("index.cshtml文件写入成功");
            console.log("自动发布已完成");
        });
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

// 复制文件
function copyFile(srcPath, tarPath, cb) {
    var rs = fs.createReadStream(srcPath);
    rs.on('error', function(err) {
        if (err) {
            console.log('read error', srcPath);
        }
        cb && cb(err);
    });
    var ws = fs.createWriteStream(tarPath);
    ws.on('error', function(err) {
        if (err) {
            console.log('write error', tarPath)
        }
        cb && cb(err)
    });
    ws.on('close', function(ex) {
        cb && cb(ex)
    });
    rs.pipe(ws)
}

// 复制文件夹
function copyFolder(srcDir, tarDir, cb) {
    fs.readdir(srcDir, function(err, files) {
        var count = 0;
        function checkEnd() {
            if (files) {
                ++count === files.length && cb && cb();
            }
        }
        if (err) {
            checkEnd();
            return
        }
        files.forEach(function(file) {
            var srcPath = path.join(srcDir, file);
            var tarPath = path.join(tarDir, file);
            fs.stat(srcPath, function(err, stats) {
                if (stats.isDirectory()) {
                    fs.mkdir(tarPath, function(err) {
                        if (err) {
                            console.log(err);
                            return
                        }
                        copyFolder(srcPath, tarPath, checkEnd);
                    })
                } else {
                    copyFile(srcPath, tarPath, checkEnd);
                }
            })
        });
        //为空时直接回调
        files.length === 0 && cb && cb();
    })
}
