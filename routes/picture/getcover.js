//获取音乐文件
var express = require('express');
var router = express.Router();
var curd = require('../../module/mysql/curd.js').con;

router.get('/getsongbyrandom', (req, res) => {
    
    curd.query('select `id`,`name`,`author`,`album` from songinfo', (err, result) => {
        if (err) {
            return;
        }
        res.send(result[Math.floor(Math.random() / 10 * result.length)]);
    })
})

router.get('/getsongbyid', (req, res) => {
    req.query.id=req.query.id.replaceAll(" ","+");
    console.log('byid',req.query.id)
    curd.query('SELECT `id`,`name`,`author`,`album` FROM songinfo WHERE `id`= ' + req.query.id, (err, result) => {
        if (err) {
            return;
        }
        res.send(result[0]);
    })
})

//获得音乐文件
router.get('/getsongfilebyid', (req, res) => {
    curd.query('SELECT * FROM songinfo WHERE `id`= "' + req.query.id + '"', (err, result) => {
        if (err) {
            return;
        }
        if(result[0]!==undefined){
            res.sendFile(result[0].songfilepath)
        }
    })
})