const express = require('express');
const router = express.Router();
const article = require('../modules/handle/article');

// 写文章
router.post('/publish', function(req, res, next) {
  article.publish(req, res, next);
});

// 查询文章列表
router.post('/query', function(req, res, next) {
  article.query(req, res, next);
});

// 图片上传
router.post('/img/upload', function(req, res, next) {
  article.imgUpload(req, res, next);
});

module.exports = router;
