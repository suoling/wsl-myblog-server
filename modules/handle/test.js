/*
  数据增删改查模块封装
  req.query 解析GET请求中的参数 包含在路由中每个查询字符串参数属性的对象，如果没有则为{}
  req.params 包含映射到指定的路线“参数”属性的对象,如果有route/user/：name，那么“name”属性可作为req.params.name
  req.body通常用来解析POST请求中的数据
  +req.query.id 可以将id转为整数
 */
const ejs = require('ejs')
const json = require('../sql/test.json')
const pool = require('../../libs/pool')

var testData = {
    add: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = req.query || req.params;
            const insertSQL = ejs.render(json.insertSQL, { name: param.name, age: param.age, address: param.address }, {delimiter: '%'})
            connection.query(insertSQL, function(err, result) {
                if (result) {
                    res.json({ code: '000000', msg: '新增成功' })
                } else {
                    res.json({ code: '999999', msg: '新增失败' })
                }
                // 释放连接 
                connection.release();
            });
        });
    },
    delete: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var id = +req.query.id;
            const deleteSQL = ejs.render(json.deleteSQL, { id }, {delimiter: '%'})
            connection.query(deleteSQL, function(err, result) {
                if (result.affectedRows > 0) {
                    res.json({ code: '000000', msg: '删除成功' })
                } else {
                    res.json({ code: '999999', msg: '删除失败' })
                }
                connection.release();
            });
        });
    },
    update: function(req, res, next) {
        var param = req.body;
        if (param.name == null || param.age == null || param.address == null || param.id == null) {
            res.json({ code: '999999', msg: '操作失败' })
            return;
        }
        pool.getConnection(function(err, connection) {
            const updateSQL = ejs.render(json.updateSQL, { name: param.name, age: param.age, address: param.address, id: param.id }, {delimiter: '%'})
            connection.query(updateSQL, function(err, result) {
                console.log(result)
                if (result) {
                    res.json({ code: '000000', msg: '更新成功' })
                } else {
                    res.json({ code: '999999', msg: '更新失败' })
                }
                connection.release();
            });
        });
    },
    queryById: function(req, res, next) {
        var id = +req.query.id;
        pool.getConnection(function(err, connection) {
            const queryByIdSQL = ejs.render(json.queryByIdSQL, { id }, {delimiter: '%'})
            connection.query(queryByIdSQL, function(err, result) {
                if (result != '') {
                    res.json({ code: '000000', msg: '查找成功', data: result });
                } else {
                    res.json({ code: '999999', msg: '操作失败' })
                }
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            const queryAllSQL = ejs.render(json.queryAllSQL, {delimiter: '%'})
            connection.query(queryAllSQL, function(err, result) {
                if (result != '') {
                    res.json({ code: '000000', msg: '全部查找成功', data: result });
                } else {
                    res.json({ code: '999999', msg: '操作失败' })
                }
                connection.release();
            });
        });
    }
};
module.exports = testData;