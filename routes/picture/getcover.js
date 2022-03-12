//获取音乐文件
var express = require('express');
var router = express.Router();
var fs = require('fs')
var curd = require('../../module/mysql/curd.js').con;
var jsmediatags = require("jsmediatags");

var { Blob } = require('blob-polyfill');
const { send } = require('process');

global['Blob'] = Blob

router.get('/', (req, res) => {
    res.send('cover')
})
//获得音乐封面
router.get('/getsongcoverbyid', (req, res) => {
    curd.query('SELECT * FROM songinfo WHERE `id`= "' + req.query.id + '"', (err, result) => {
        if (err) {
            return;
        }
        if (result[0] !== undefined) {
            jsmediatags.read(result[0].songfilepath, {//读取音乐文件信息
                onSuccess: function (tag) {
                    res.send(tag)
                    if (tag.picture !== undefined) {
                        let data = tag.tags.picture.data;
                        res.send(new Buffer(data))//传输图片二进制
                        return;
                    } else {//该音乐文件不存在图片
                        res.send(new Buffer(0))
                    }
                }
            })
        }

    })
})

module.exports = router;