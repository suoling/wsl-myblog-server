/*
  数据增删改查模块封装
  req.query 解析GET请求中的参数 包含在路由中每个查询字符串参数属性的对象，如果没有则为{}
  req.params 包含映射到指定的路线“参数”属性的对象,如果有route/user/：name，那么“name”属性可作为req.params.name
  req.body通常用来解析POST请求中的数据
  +req.query.id 可以将id转为整数
*/

const express = require('express');
const router = express.Router();
const indexService = require('../service/index.service')

// 首页渲染
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SQL for MySQL' });
});

// 查询所有数据
router.get('/queryall', async function(req, res, next) {
  const result = await indexService.queryAll()
  if (result) {
    res.json({ res: result })
  }
});

// 插入数据
router.get('/add', async function(req, res, next) {
  const { name, age, address } = req.query
  const result = await indexService.insert(name, age, address)
  if (result) {
    res.json({ code: '000000', msg: '添加成功' })
  }
});

// 查询指定数据
router.get('/query', async function(req, res, next) {
  const id = req.query.id
  const result = await indexService.queryById(id)
  if (result) {
    res.json({ res: result })
  }
});

// 删除指定数据
router.get('/delete', async function(req, res, next) {
  const id = req.query.id
  console.log('id:', id)
  const result = await indexService.deleteById(id)
  if (result) {
    res.json({ code: '000000', msg: '删除成功' })
  }
});

// update页渲染
router.get('/update', function(req, res, next) {
  res.render('update');
});

// 更新指定数据
router.post('/update', async function(req, res, next) {
  const { id } = req.query
  const { name, age, address } = req.body
  const result = await indexService.updateById(id, name, age, address)
  if (result) {
    res.json({ code: '000000', msg: '更新成功' })
  }
});

module.exports = router;