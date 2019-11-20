// 引入mysql
const mysql = require('mysql');
// 引入mysql连接配置
const mysqlconfig = require('../config/mysql');
// 引入连接池配置
const poolextend = require('./poolextend');
// 使用连接池，提升性能
const pool = mysql.createPool(poolextend({}, mysqlconfig));

module.exports = pool;