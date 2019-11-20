const ejs = require('ejs')
const json = require('../sql/article.json')
const pool = require('../../libs/pool')

const articleData = {
  write: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      const param = req.body;
      const insertSQL = ejs.render(json.insertSQL, {
        user_id: param.userId,
        title: param.title,
        description: param.desc,
        text: param.text
      }, {delimiter: '%'})
      connection.query(insertSQL, function(err, result) {
        if (result) {
          res.json({ code: '000000', msg: '文章提交成功'})
        } else {
          res.json({ code: '999999', msg: '文章提交失败'})
        }
        connection.release();
      });
    });
  }
};

module.exports = articleData;