const express = require('express');
const router = express.Router();
const codeMap = require('../const/codeMap');
const userService = require('../service/user.service');
const crypto = require('crypto');


// 用户注册
router.post('/', async function(req, res, next) {
  const param = req.body;
  const hash = crypto.createHash('md5')
  hash.update(param.pass)
  param.pass = hash.digest('hex')
  const { phone, pass } = param
  try {
    await userService.userRegister(phone, pass)
    res.json({ code: codeMap.success, msg: '注册成功' })
  } catch (err) {
    res.json({ code: codeMap.error, msg: '注册失败' })
  }
});

// 检测手机号是否被注册
router.post('/check', async function(req, res, next) {
  const { phone } = req.body;
  console.log('phone:', phone)
  try {
    const result = await userService.userIsRegister(phone)
    if (result && result.length > 0) {
      res.json({ code: codeMap.success, msg: '该手机号已被注册', exist: true })
    } else if (result && result.length == 0) {
      res.json({ code: codeMap.success, msg: '该手机号未被注册', exist: false })
    }
  } catch (err) {
    res.json({ code: codeMap.error, msg: '操作失败', exist: false })
  }
});

// 用户登陆
router.post('/login', async function(req, res, next) {
  const param = req.body;
  const hash = crypto.createHash('md5')
  hash.update(param.pass)
  param.pass = hash.digest('hex')
  const { phone, pass } = param
  try {
    const result = await userService.userLogin(phone, pass)
    if (result && result.length > 0) {
      res.json({ code: codeMap.success, msg: '登陆成功', login_id: result[0].id })
    } else if (result && result.length == 0) {
      res.json({ code: codeMap.error, msg: '密码输入错误' })
    }
  } catch (err) {
    res.json({ code: codeMap.error, msg: '操作失败' })
  }
});

module.exports = router;
