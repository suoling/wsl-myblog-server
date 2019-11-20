const ejs = require('ejs')
const json = require('../sql/user.json')
const pool = require('../../libs/pool')
// 加密
const crypto = require('crypto')

const userData = {
  register: function(req, res, next) {
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
  },
  registerFlag: function(req, res, next) {
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
  },
  login: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      const param = req.body;
      console.log('param:', param)
      hash = crypto.createHash('md5')
      hash.update(param.pass)
      const selectSQL = ejs.render(json.selectSQL, { phone: param.phone, pass: hash.digest('hex') }, {delimiter: '%'})
      connection.query(selectSQL, function(err, result) {
        if (result instanceof Array && result.length > 0) {
          res.json({ code: '000000', msg: '登陆成功', userId: result[0].id })
        } else {
          const selectPhoneSQL = ejs.render(json.selectPhoneSQL, { phone: param.phone }, {delimiter: '%'})
          connection.query(selectPhoneSQL, function(err1, result1) {
            if (result1 instanceof Array && result1.length > 0) {
              console.log(result1)
              res.json({ code: '999999', msg: '密码输入错误' })
            } else {
              res.json({ code: '999999', msg: '输入的账号未注册' })
            }
          })
        }
        connection.release();
      });
    });
  }
};
module.exports = userData;