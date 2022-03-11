var mysql = require('mysql');
var config = require('../../config.js')
var con = mysql.createConnection(config.MYSQL_INFO);
con.connect();
exports.con = con;