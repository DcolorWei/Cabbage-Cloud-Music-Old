//获取歌单

var express = require('express');
var router = express.Router();
var curd = require('../../module/mysql/curd.js').con;


//获得随机歌单
router.get('/getsonglistbyrandom', (req, res) => {
    for (let i = 0; i < 20; i++) {
        curd.query('select `id`,`name`,`author`,`album` from songinfo', (err, result) => {
            if (err) {
                return;
            }
            res.send(result);
        })
    }

})

module.exports = router;