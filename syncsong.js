var jsmediatags = require("jsmediatags");
var fs = require("fs");
var path = require("path");
var list = [];
var curd = require('./module/mysql/curd.js').con;
function listFile(dir) {
    var arr = fs.readdirSync(dir);
    arr.forEach(async function (item) {
        var fullpath = path.join(dir, item);
        var stats = fs.statSync(fullpath);
        if (stats.isDirectory()) {
            listFile(fullpath);
        } else {
            jsmediatags.read(fullpath, {//读取音乐文件信息
                onSuccess: function (tag) {
                    console.log(fullpath)
                    if (!tag.tags.title) return;//没有歌曲详细信息，为待处理音乐文件，不纳入数据库
                    let sql = "INSERT INTO songinfo(`id`,`name`,`author`,`album`,`songfilepath`) VALUES(?,?,?,?,?)";
                    let params = [
                        Buffer.from(tag.tags.title + tag.tags.artist+tag.tags.album).toString('base64'), //避免相同文件上传
                        tag.tags.title,
                        tag.tags.artist, 
                        tag.tags.album, 
                        fullpath
                        ];
                    curd.query(sql, params, function (err, result) { return; })
                },
                onError: function (error) {
                    console.log(':(', error.type, error.info);
                }
            })
        }
    });
    return list;
}
listFile("/root/music/stock/song");