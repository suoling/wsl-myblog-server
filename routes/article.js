const express = require('express');
const router = express.Router();
const ROOT = require('../const/env');
const codeMap = require('../const/codeMap');
const articleService = require('../service/article.service');

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'))
  },
  filename: function (req, file, cb) {
    const arr = file.originalname.split('\.');
    cb(null, file.fieldname + '-' + Date.now() + '.' + arr[arr.length - 1])
  }
});

const upload = multer({ storage: storage });

// 上传图片
router.post('/upload', upload.array('image', 12), function (req, res, next) {
  res.json({ code: codeMap.success, imgUrl: ROOT.local + 'images/' + req.files[0].filename })
});

// 文章列表
router.post('/query', async function(req, res, next) {
  const { login_id } = req.headers;
  const { type, page_size, page_num } = req.body;
  try {
    let result;
    if (type === 'all') {
      result = await articleService.articleQueryAll(type, login_id, page_size, page_num);
    } else if (type === 'mine') {
      result = await articleService.articleQueryByUserId(type, login_id, page_size, page_num);
    }
    res.json({ code: codeMap.success, msg: '文章列表查询成功', result: result })
  } catch (err) {
    res.json({ code: codeMap.error, msg: '文章列表查询失败' })
  }
});

// 文章详情
router.post('/queryDetail', async function (req, res, next) {
  const { id} = req.body;
  try {
    const result = await articleService.articleDetail(id);
    res.json({ code: codeMap.success, msg: '文章查询成功', articleDetail: result})
  } catch (err) {
    res.json({ code: codeMap.error, msg: '文章查询失败'})
  }
});

// 文章发布
router.post('/publish', async function(req, res, next) {
  const { login_id } = req.headers;
  const { title, md_content, html_code } = req.body;
  try {
    await articleService.articlePublish(login_id, title, md_content, html_code);
    res.json({ code: codeMap.success, msg: '文章提交成功'})
  } catch (err) {
    res.json({ code: codeMap.error, msg: '文章提交失败'})
  }
});

// 文章编辑
router.post('/edit', async function (req, res, next) {
  const { id, title, md_content, html_code } = req.body;
  try {
    await articleService.articleUpdateById(id, title, md_content, html_code);
    res.json({ code: codeMap.success, msg: '文章编辑成功'})
  } catch (err) {
    console.log(err);
    res.json({ code: codeMap.error, msg: '文章编辑失败'})
  }
});

// 文章删除
router.post('/delete', async function (req, res, next) {
  const { id } = req.body;
  try {
    await articleService.articleDelete(id);
    res.json({ code: codeMap.success, msg: '文章删除成功'})
  } catch (err) {
    res.json({ code: codeMap.error, msg: '文章删除失败'})
  }
});

module.exports = router;
