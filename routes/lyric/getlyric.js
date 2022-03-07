var express = require('express');
var iconv = require('iconv-lite');
var router = express.Router();
var fs = require('fs');

router.get('/getlyricbysongname', (req, res) => {
    fs.readFile(`stock/lyric/${req.query.songname}.lrc`, function (err, data) {
        if (err) {
            res.send('none');
            return;
        }
        let result = [];
        iconv.decode(data,'gbk').toString().split("\n").forEach(element => {
            let item = element.split(']');//根据右方括号分离出时间和歌词
            result.push([item[0].substring(1), item[1]]);//舍弃左方括号,组合
        });
        res.send(result);
    });

})


module.exports = router;