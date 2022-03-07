var jsmediatags = require("jsmediatags");
var fs = require("fs");
var path = require("path");
var list = [];
var curd = require('./module/mysql/curd.js').con;

//设置异步防止数据库并发过大
function insert(fullpath) {
    return new Promise(function (resolve) {
        jsmediatags.read(fullpath, {//读取音乐文件信息
            onSuccess: function (tag) {
                if (!tag.tags.title) {
                    let pathArr = fullpath.split('/');
                    pathArr[pathArr.length - 2] = 'abnormal';
                    fs.rename(fullpath, pathArr.join('/'), (err) => { });
                    console.log(`${fullpath} 异常，已移入待处理文件夹`);
                    resolve("abnormal file");
                    return;
                };//没有歌曲详细信息，为待处理音乐文件，不纳入数据库
                let sql = "INSERT INTO songinfo(`id`,`name`,`author`,`album`,`songfilepath`) VALUES(?,?,?,?,?)";
                let songid = Buffer.from(tag.tags.title + tag.tags.artist + tag.tags.album).toString('base64').replaceAll('+', '');//清除加号
                let params = [
                    songid, //避免相同文件上传
                    tag.tags.title,
                    tag.tags.artist,
                    tag.tags.album,
                    fullpath
                ];
                curd.query(sql, params, (err) => {
                    if (err) {
                        //暂时有问题
                        // let pathArr = fullpath.split('/');
                        // pathArr[pathArr.length - 2] = 'duplicate';
                        // pathArr[pathArr.length - 1] = Date.now() + pathArr[pathArr.length - 1];
                        // fs.copyFile(fullpath, pathArr.join('/'), (err) => { });
                        // console.log(`${fullpath} 已存在，已复制入重复文件夹`);
                        // resolve("abnormal file");
                        resolve("该条目已存在");
                    }
                    else {
                        resolve("已录入");
                    }
                })
            }
        })
    })
}
async function listFile(dir) {
    var arr = fs.readdirSync(dir);
    for (item of arr) {
        var fullpath = path.join(dir, item);
        var stats = fs.statSync(fullpath);
        if (stats.isDirectory()) {//判断是否是文件，是则继续向下遍历
            listFile(fullpath);
        } else {
            await insert(fullpath);
        }
    };
    return list;
}
listFile("/root/music/stock/song");