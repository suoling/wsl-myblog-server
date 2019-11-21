const express = require('express');
const router = express.Router();
const userService = require('../service/user.service')
const crypto = require('crypto')


// 用户注册
router.post('/', async function(req, res, next) {
  const param = req.body;
  hash = crypto.createHash('md5')
  hash.update(param.pass)
  param.pass = hash.digest('hex')
  const { phone, pass } = param
  const result = await userService.userRegister(phone, pass)
  if (result) {
    res.json({ code: '000000', msg: '注册成功' })
  } else {
    res.json({ code: '999999', msg: '注册失败' })
  }
});

// 检测手机号是否被注册
router.post('/check', async function(req, res, next) {
  const { phone } = req.body;
  const result = await userService.userIsRegister(phone)
  if (result instanceof Array && result.length > 0) {
    res.json({ code: '000000', msg: '该手机号已被注册', exist: true })
  } else {
    res.json({ code: '999999', msg: '该手机号未被注册', exist: false })
  }
});

// 用户登陆
router.post('/login', async function(req, res, next) {
  const param = req.body;
  hash = crypto.createHash('md5')
  hash.update(param.pass)
  param.pass = hash.digest('hex')
  const { phone, pass } = param
  const result = await userService.userLogin(phone, pass)
  if (result instanceof Array && result.length > 0) {
    res.json({ code: '000000', msg: '登陆成功', userId: result[0].id })
  } else {
    const result1 = await userService.userIsRegister(phone)
    if (result1 instanceof Array && result1.length > 0) {
      console.log(result1)
      res.json({ code: '999999', msg: '密码输入错误' })
    } else {
      res.json({ code: '999999', msg: '输入的账号未注册' })
    }
  }

});

module.exports = router;
