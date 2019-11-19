const express = require('express');
const router = express.Router();
const ejs = require('ejs')
const json = require('../modules/sql/usersql.json')
// 加密
const crypto = require('crypto')
// 引入mysql
var mysql = require('mysql');
// 引入mysql连接配置
var mysqlconfig = require('../config/mysql');
// 引入连接池配置
var poolextend = require('../modules/poolextend');
// 引入SQL模块
var sql = require('../modules/sql');
// 使用连接池，提升性能
var pool = mysql.createPool(poolextend({}, mysqlconfig));

// 用户注册
router.post('/', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    const param = req.body;
    hash = crypto.createHash('md5')
    hash.update(param.pass)
    param.pass = hash.digest('hex')
    const insertSql = ejs.render(json.insertSQL, {phone: param.phone, pass:param.pass}, {delimiter: '%'})
    connection.query(insertSql, function(err, result) {
      if (result) {
        res.json({ code: '000000', msg: '注册成功' })
      } else {
        res.json({ code: '999999', msg: '注册失败' })
      }
      // 释放连接 
      connection.release();
    });
  });
});

// 检测手机号是否被注册
router.post('/check', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    const param = req.body;
    const selectPhoneSQL = ejs.render(json.selectPhoneSQL, { phone: param.phone }, {delimiter: '%'})
    connection.query(selectPhoneSQL, function(err, result) {
      if (result instanceof Array && result.length > 0) {
        res.json({ code: '000000', msg: '该手机号已被注册', exist: true })
      } else {
        res.json({ code: '999999', msg: '该手机号未被注册', exist: false })
      }
      connection.release();
    });
  });
});

// 用户登陆
router.post('/login', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    const param = req.body;
    hash = crypto.createHash('md5')
    hash.update(param.pass)
    const selectSQL = ejs.render(json.selectSQL, { phone: param.phone, pass: hash.digest('hex') }, {delimiter: '%'})
    connection.query(selectSQL, function(err, result) {
      if (result instanceof Array && result.length > 0) {
        res.json({ code: '000000', msg: '登陆成功' })
      } else {
        const selectPhoneSQL = ejs.render(json.selectPhoneSQL, { phone: param.phone }, {delimiter: '%'})
        connection.query(selectPhoneSQL, function(err1, result1) {
          if (result instanceof Array && result.length > 0) {
            res.json({ code: '999999', msg: '密码输入错误' })
          } else {
            res.json({ code: '999999', msg: '输入的账号未注册' })
          }
        })
      }
      connection.release();
    });
  });
});


module.exports = router;
