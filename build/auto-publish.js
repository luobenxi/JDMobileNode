const path = require('path');
const fs = require("fs");
const encoding = require("encoding");
let readFilePath = path.resolve(__dirname, '../dist/static/');
let readFilePathIndexHtml = path.resolve(__dirname, '../dist/index.html');
let writeFilePathPublic = 'D:\\VS2012Projects\\SVN\\JDHR\\JDCRM.Web\\';
let writeFilePath = writeFilePathPublic + 'static\\';
let writeFilePathIndexHtml = writeFilePathPublic + 'Views\\Mobile\\index.cshtml';

console.log('项目打包路径：' + readFilePath);
console.log('项目部署路径：' + writeFilePath);

// 删除原来的文件
deleteFolder(writeFilePath);

// 判断项目部署路径是否存在，不存在则创建
fs.exists(writeFilePath, function (exists) {
    if (!exists) {
        fs.mkdir(writeFilePath);
        // 复制打包后的文件至项目部署路径
        copyFolder(readFilePath, writeFilePath, function(err) {
            if (!err) {
                console.log('copy ok');
                // 写入index.cshtml文件
                AddIndexHtml();
            }
        });
    }
});

// 写入index.cshtml文件
function AddIndexHtml() {
    fs.readFile(readFilePathIndexHtml, function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("index.html读取成功");
        console.log("index.html开始写入...");
        var resultBuffer = encoding.convert(data, "GBK"); // GB2312
        fs.writeFile(writeFilePathIndexHtml, resultBuffer, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("index.html文件写入成功");
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
            ++count === files.length && cb && cb();
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
