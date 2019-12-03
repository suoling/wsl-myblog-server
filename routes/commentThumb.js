const express = require('express');
const router = express.Router();
const codeMap = require('../const/codeMap');
const commentThumbService = require('../service/commentThumb.service');

// 评论点赞
router.post('/', async function (req, res, next) {
    const { user_id, comment_id } = req.body;
    try {
        await commentThumbService.commentThumb(user_id, comment_id);
        res.json({ code: codeMap.success, msg: '评论点赞成功'})
    } catch (res) {
        res.json({ code: codeMap.error, msg: '评论点赞失败'})
    }
});

// 评论取消点赞
router.post('/cancel', async function (req, res, next) {
    const { user_id, comment_id } = req.body;
    try {
        await commentThumbService.commentThumbCancel(user_id, comment_id);
        res.json({ code: codeMap.success, msg: '评论取消点赞成功'})
    } catch (err) {
        res.json({ code: codeMap.error, msg: '评论取消点赞失败'})
    }
});

module.exports = router;
