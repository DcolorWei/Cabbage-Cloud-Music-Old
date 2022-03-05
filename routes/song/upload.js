var express = require('express');
var router = express.Router();
var multer = require('multer')
var fs = require('fs')
var jsmediatags = require("jsmediatags");
var curd = require('../../module/mysql/curd.js').con;
//设置保存路径
var upload = multer({ dest: 'stock/song/' })

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('<form action="/upload/file" enctype="multipart/form-data" method="POST"><input type="file" name="image"><input type="submit" value="上传"></form>')
});

router.post('/file', upload.single("image"), function (req, res, next) {
    //文件路径
    fs.rename(`stock/song/${req.file.filename}`, `stock/song/${req.file.originalname}`, (err) => {//重命名
        if (!err) {
            jsmediatags.read(`stock/song/${req.file.originalname}`, {//读取音乐文件信息
                onSuccess: function (tag) {
                    if (!tag.tags.title) return;//没有歌曲详细信息，为待处理音乐文件，不纳入数据库
                    let sql = "INSERT INTO songinfo(`id`,`name`,`author`,`album`,`songfilepath`) VALUES(?,?,?,?,?)";
                    let params = [
                        Buffer.from(tag.tags.title + tag.tags.artist+tag.tags.album).toString('base64'), //避免相同文件上传
                        tag.tags.title,
                        tag.tags.artist, 
                        tag.tags.album,
                        `/song/${req.file.originalname}`
                        ];
                    curd.query(sql, params, function (err, result) { return; })
                },
                onError: function (error) {
                    console.log(':(', error.type, error.info);
                }
            })
        }
    });

    res.send('<form action="/upload/file" enctype="multipart/form-data" method="POST"><input type="file" name="image"><input type="submit" value="上传"></form>')
});

module.exports = router;