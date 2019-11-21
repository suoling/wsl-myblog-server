const pool = require('../libs/pool')
const ejs = require('ejs')
const json = require('../sqltempl/article.json')

const articleMapper = {
  articleQueryByUserId (user_id) {
    return sqlOperateRes(ejs.render(json.articleQueryByUserIdSQL, { user_id }, { delimiter: '%' }))
  },
  articlePublish (user_id, title, description, text) {
    return sqlOperateRes(ejs.render(json.articlePublishSQL, { user_id, title, description, text }, { delimiter: '%' }))
  }
}

function sqlOperateRes (sql) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject('连接MySQL出错')
      } else {
        connection.query(sql, function(err, result) {
          connection.release();
          if (err) {
            reject('查询数据出错')
          } else {
            resolve(result)
          }
        });
      }
    });
  })
}

module.exports = articleMapper