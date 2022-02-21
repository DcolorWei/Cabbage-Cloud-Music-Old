var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    port: '8888',
    user: 'root',
    password: 'wdc20140772',
    database: 'music'
});

con.connect();


exports.con = con;