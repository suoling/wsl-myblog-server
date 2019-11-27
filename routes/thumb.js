const express = require('express');
const router = express.Router();
const codeMap = require('../const/codeMap');
const thumbService = require('../service/thumb.service');

// 查询文章点赞数
router.post('/query', async function (req, res, next) {
    const { article_id } = req.body
    console.log('req:', req)
    try {
        const result = await thumbService.thumbQuery(article_id)
        res.json({ code: codeMap.success, msg: '点赞人数查询成功', thumbNum: result.length})
    } catch (err) {
        res.json({ code: codeMap.error, msg: '点赞人数查询失败' })
    }
})

// 文章点赞
router.post('/', async function (req, res, next) {
    const { user_id, article_id } = req.body
    try {
        await thumbService.thumb(user_id, article_id)
        res.json({ code: codeMap.success, msg: '文章点赞成功'})
    } catch (res) {
        res.json({ code: codeMap.error, msg: '文章点赞失败'})
    }
})

// 文章取消点赞
router.post('/cancel', async function (req, res, next) {
    const { user_id, article_id } = req.body
    try {
        await thumbService.thumbCancel(user_id, article_id)
        res.json({ code: codeMap.success, msg: '文章取消点赞成功'})
    } catch (err) {
        res.json({ code: codeMap.error, msg: '文章取消点赞失败'})
    }
})

module.exports = router;
