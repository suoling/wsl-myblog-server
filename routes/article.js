const express = require('express');
const router = express.Router();
const articleService = require('../service/article.service')

// 查询文章列表
router.post('/query', async function(req, res, next) {
  const { userId: user_id } = req.body
  const result = await articleService.articleQueryByUserId(user_id)
  if (result) {
    res.json({ code: '000000', msg: 'success', data: result })
  } else {
    res.json({ code: '999999', msg: 'error' })
  }
});

// 写文章
router.post('/publish', async function(req, res, next) {
  const { userId: user_id, title, desc: description, text } = req.body
  const result = await articleService.articlePublish(user_id, title, description, text)
  if (result) {
    res.json({ code: '000000', msg: '文章提交成功'})
  } else {
    res.json({ code: '999999', msg: '文章提交失败'})
  }
});

// 删除文章
router.post('/delete', async function (req, res, next) {
  const { userId: user_id, articleId: article_id } = req.body
  const result = await articleService.articleDelete(user_id, article_id)
  if (result) {
    res.json({ code: '000000', msg: '文章删除成功'})
  } else {
    res.json({ code: '000000', msg: '文章删除失败'})
  }
})

module.exports = router;
