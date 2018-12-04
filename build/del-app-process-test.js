process.stdin.setEncoding('utf8');
const params = process.argv.splice(2);
if (params.length !== 1) {
    console.log('参数异常，请传入1个参数！');
    console.log('参数说明：模块英文名称');
    process.exit(0);
}
console.log('参数：' + params);
process.stdout.write("确认执行删除吗(Y/N)？");
process.stdin.on('data',(input) => {
    input = input.toString().trim();
    if (['Y', 'y', 'YES', 'yes'].indexOf(input) > -1) {
        console.log('开始删除...');
        setTimeout((_) => {
            console.log('删除成功');
            process.exit(0);
        }, 1000);
    }
    if (['N', 'n', 'NO', 'no'].indexOf(input) > -1) {
        console.log('你取消了删除操作');
        process.exit(0);
    }
});
