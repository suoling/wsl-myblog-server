const express = require('express');
const router = express.Router();
const codeMap = require('../const/codeMap');
const commentService = require('../service/comment.service');

// 评论列表
router.post('/', async function (req, res, next) {
    const { article_id } = req.body;
    try {
        const result = await commentService.commentQueryAll(article_id);
        res.json({ code: codeMap.success, msg: '评论列表查询成功', commentList: result});
    } catch (err) {
        res.json({ code: codeMap.error, msg: '评论列表查询失败'});
    }
});

// 添加评论
router.post('/add', async function (req, res, next) {
    const { user_id, article_id, prev_id, content } = req.body;
    try {
        await commentService.commentAdd(user_id, article_id, prev_id, content);
        res.json({ code: codeMap.success, msg: '评论成功'});
    } catch (res) {
        res.json({ code: codeMap.error, msg: '评论失败'});
    }
});

module.exports = router;
