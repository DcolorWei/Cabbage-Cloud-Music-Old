//获取音乐文件
var express = require('express');
var router = express.Router();
var curd = require('../../module/mysql/curd.js').con;
var jsmediatags = require("jsmediatags");

var { Blob } = require('blob-polyfill');

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
                    let data = tag.tags.picture.data;
                    res.send('data:image/png;base64,' + new Buffer(data).toString('base64'));
                    return;
                }
            })
        }

    })
})

module.exports = router;