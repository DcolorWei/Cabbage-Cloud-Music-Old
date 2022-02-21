var express = require('express');
var router = express.Router();
var path = require('path')
var curd = require('../../module/mysql/curd.js').con;

const STOCK_PATH = '/root/music/stock';


router.get('/', (req, res) => {
    res.send('<h1>111</h1>')
})
router.get('/getsongbyrandom', (req, res) => {
    curd.query('select `id`,`name`,`author`,`album`,`duration` from songinfo', (err, result) => {
        if (err) {
            return;
        }
        res.send(result[Math.floor(Math.random() / 10 * result.length)]);
    })
})


router.get('/getsongbyid', (req, res) => {
    curd.query('SELECT `id`,`name`,`author`,`album`,`duration` FROM songinfo WHERE `id`= ' + req.query.id, (err, result) => {
        if (err) {
            return;
        }
        res.send(result[0]);
    })
})

router.get('/getsongfilebyid', (req, res) => {
     
    curd.query('SELECT * FROM songinfo WHERE `id`= "' + req.query.id+'"', (err, result) => {
        if (err) {
            return;
        }
       res.sendFile(STOCK_PATH+result[0].songfilepath)
    })
})

module.exports = router;