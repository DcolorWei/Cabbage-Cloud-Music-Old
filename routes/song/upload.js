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

router.post('/file', upload.single("image"), function (req, res) {
    //文件路径
    fs.readFile(`stock/song/${req.file.originalname}`, (err) => {
        if (err) {//不存在文件，移动进入音乐文件夹
            fs.rename(`stock/song/${req.file.filename}`, `stock/song/${req.file.originalname}`, (err) => { });
        }
        //存在同名文件，移动进入重复文件夹,利用时间戳命名
        fs.rename(`stock/song/${req.file.filename}`, `stock/duplicate/${Date.now()}/${req.file.originalname}`, (err) => { });
    });
    res.send('<form action="/upload/file" enctype="multipart/form-data" method="POST"><input type="file" name="image"><input type="submit" value="上传"></form>')
});

module.exports = router;