const pool = require('./pool')

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

module.exports = sqlOperateRes