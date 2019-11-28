const express = require('express');
const cheerio = require('cheerio');
const router = express.Router();
const ROOT = require('../const/env');
const codeMap = require('../const/codeMap');
const transfer = require('../const/transfer');
const articleService = require('../service/article.service');
const thumbService = require('../service/thumb.service');

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
  console.log(req.headers)
  const { type } = req.body;
  try {
    let result;
    if (type === 'all') {
      result = await articleService.articleQueryAll();
    } else if (type === 'mine') {
      result = await articleService.articleQueryByUserId(login_id);
    }
    for (let i = 0, len = result.length; i < len; i++) {
      // 将html字符串中个别特殊的字符进行反转义
      result[i].html_code = transfer(result[i].html_code);
      // 获取文章的点赞数
      const thumbCount = await thumbService.thumbQuery(result[i].id);
      result[i].thumb_count = thumbCount[0].count;
      // 判断用户是否已点赞
      const thumbFlag = await thumbService.thumbFlag(login_id, result[i].id);
      result[i].thumb_flag = thumbFlag[0].count; // 1 代表已点赞。0 代表未点赞
    }
    res.json({ code: codeMap.success, msg: '文章列表查询成功', articleList: result })
  } catch (err) {
    res.json({ code: codeMap.error, msg: '文章列表查询失败' })
  }
});

// 文章详情
router.post('/queryDetail', async function (req, res, next) {
  const { id} = req.body;
  console.log(id);
  try {
    const result = await articleService.articleQueryById(id);
    res.json({
      code: codeMap.success,
      msg: '文章查询成功',
      articleDetail: Object.assign({}, result[0], { md_content: transfer(result[0].md_content) }) })
  } catch (err) {
    res.json({ code: codeMap.error, msg: '文章查询失败'})
  }
});

// 文章发布
router.post('/publish', async function(req, res, next) {
  const { login_id } = req.headers;
  const { title, md_content, html_code } = req.body;
  let $ = cheerio.load(html_code);
  let pEleText = $('p').text();
  let description = pEleText.length > 1000 ? pEleText.slice(0, 1000) : pEleText;
  try {
    await articleService.articlePublish(login_id, title, description, md_content, html_code);
    res.json({ code: codeMap.success, msg: '文章提交成功'})
  } catch (err) {
    res.json({ code: codeMap.error, msg: '文章提交失败'})
  }
});

// 文章编辑
router.post('/edit', async function (req, res, next) {
  const { id, title, md_content, html_code } = req.body;
  let $ = cheerio.load(html_code);
  let pEleText = $('p').text();
  let description = pEleText.length > 300 ? `${pEleText.slice(0, 300)}...` : `${pEleText}...`;
  try {
    await articleService.articleUpdateById(id, title, description, md_content, html_code);
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
