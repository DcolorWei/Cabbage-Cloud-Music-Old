var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    port: '2022',
    user: 'root',
    password: 'wdc20140772',
    database: 'music'
});

con.connect();

function RowDataPacketToJson(RowDataPacket) {
    let result = {};
    for (const key in RowDataPacket) result[key] = RowDataPacket[key]
    return result;
}
let addSql = 'select * from songinfo'

con.query(addSql, function (err, result) {
    if (err) {
        return false;
    }
    let res = [];
    for (let i = 0; i < result.length; i++) {
        res.push(RowDataPacketToJson(result[i]))
    }
    return res;
});

exports.query = con.query;