const express = require('express');
const router = express.Router();
const codeMap = require('../const/codeMap');
const articleThumbService = require('../service/articleThumb.service');

// 文章点赞
router.post('/', async function (req, res, next) {
    const { user_id, article_id } = req.body
    try {
        await articleThumbService.articleThumb(user_id, article_id)
        res.json({ code: codeMap.success, msg: '文章点赞成功'})
    } catch (res) {
        res.json({ code: codeMap.error, msg: '文章点赞失败'})
    }
})

// 文章取消点赞
router.post('/cancel', async function (req, res, next) {
    const { user_id, article_id } = req.body
    try {
        await articleThumbService.articleThumbCancel(user_id, article_id)
        res.json({ code: codeMap.success, msg: '文章取消点赞成功'})
    } catch (err) {
        res.json({ code: codeMap.error, msg: '文章取消点赞失败'})
    }
})

module.exports = router;
