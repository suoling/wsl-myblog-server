const express = require('express');
const router = express.Router();
const user = require('../modules/handle/user');

// 用户注册
router.post('/', function(req, res, next) {
  user.register(req, res, next);
});

// 检测手机号是否被注册
router.post('/check', function(req, res, next) {
  user.registerFlag(req, res, next);
});

// 用户登陆
router.post('/login', function(req, res, next) {
  user.login(req, res, next);
});

module.exports = router;
