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
    const arr = file.originalname.split('\.')
    cb(null, file.fieldname + '-' + Date.now() + '.' + arr[arr.length - 1])
  }
})
const upload = multer({ storage: storage })

// 上传图片
router.post('/upload', upload.array('image', 12), function (req, res, next) {
  res.json({ code: codeMap.success, imgUrl: ROOT.local + 'images/' + req.files[0].filename })
})

// 文章列表-所有
router.post('/queryAll', async function (req, res, next) {
  try {
    const result = await articleService.articleQueryAll()
    res.json({ code: codeMap.success, msg: '文章列表查询成功', articleAllList: result })
  } catch (err) {
    res.json({ code: codeMap.error, msg: '文章列表查询失败' })
  }
})

// 文章列表-指定用户
router.post('/queryByUser', async function(req, res, next) {
  const { user_id } = req.body
  try {
    const result = await articleService.articleQueryByUserId(user_id)
    res.json({ code: codeMap.success, msg: '文章列表查询成功', articleList: result })
  } catch (err) {
    res.json({ code: codeMap.error, msg: '文章列表查询失败' })
  }
});

// 文章详情-指定文章
router.post('/queryDetail', async function (req, res, next) {
  const { id} = req.body
  console.log(id)
  try {
    const result = await articleService.articleQueryById(id)
    res.json({ code: codeMap.success, msg: '文章查询成功', articleDetail: result[0]})
  } catch (err) {
    res.json({ code: codeMap.error, msg: '文章查询失败'})
  }
});

// 文章发布
router.post('/publish', async function(req, res, next) {
  const { user_id, title, md_content } = req.body
  let description
  if (md_content.length > 300) {
    description = md_content.slice(0, 300)
  } else {
    description = md_content
  }
  try {
    await articleService.articlePublish(user_id, title, description, md_content)
    res.json({ code: codeMap.success, msg: '文章提交成功'})
  } catch (err) {
    res.json({ code: codeMap.error, msg: '文章提交失败'})
  }
});

// 文章编辑
router.post('/edit', async function (req, res, next) {
  console.log(req.body)
  const { id, title, md_content } = req.body
  let description
  if (md_content.length > 300) {
    description = md_content.slice(0, 300)
  } else {
    description = md_content
  }
  try {
    await articleService.articleUpdateById(id, title, description, md_content)
    res.json({ code: codeMap.success, msg: '文章编辑成功'})
  } catch (err) {
    res.json({ code: codeMap.error, msg: '文章编辑失败'})
  }
});

// 文章删除
router.post('/delete', async function (req, res, next) {
  const { id } = req.body
  try {
    await articleService.articleDelete(id)
    res.json({ code: codeMap.success, msg: '文章删除成功'})
  } catch (err) {
    res.json({ code: codeMap.error, msg: '文章删除失败'})
  }
})

module.exports = router;
