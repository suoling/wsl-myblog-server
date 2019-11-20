const express = require('express');
const router = express.Router();
const article = require('../modules/handle/article');

// 写文章
router.post('/write', function(req, res, next) {
  article.write(req, res, next);
});

module.exports = router;
