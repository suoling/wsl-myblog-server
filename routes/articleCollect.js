const express = require('express');
const router = express.Router();
const codeMap = require('../const/codeMap');
const articleCollectService = require('../service/articleCollect.service');

// 收藏列表
router.post('/query', async function(req, res, next) {
    const { login_id } = req.headers;
    const { page_size, page_num } = req.body;
    try {
        const result = await articleCollectService.articleQueryByUserId(login_id, page_size, page_num);
        res.json({ code: codeMap.success, msg: '收藏列表查询成功', result: result })
    } catch (err) {
        res.json({ code: codeMap.error, msg: '收藏列表查询失败' })
    }
});

// 收藏
router.post('/', async function(req, res, next) {
    const { login_id } = req.headers;
    const { article_id} = req.body;
    try {
        const result = await articleCollectService.articleCollect(login_id, article_id);
        res.json({ code: codeMap.success, msg: '收藏询成功' })
    } catch (err) {
        res.json({ code: codeMap.error, msg: '收藏失败' })
    }
});

// 取消收藏
router.post('/cancel', async function(req, res, next) {
    const { login_id } = req.headers;
    const { article_id } = req.body;
    try {
        const result = await articleCollectService.articleCollectCancel(login_id, article_id);
        res.json({ code: codeMap.success, msg: '取消收藏成功', result: result })
    } catch (err) {
        res.json({ code: codeMap.error, msg: '取消收藏失败' })
    }
});

module.exports = router;
