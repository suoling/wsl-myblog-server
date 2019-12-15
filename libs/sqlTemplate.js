const pool = require('./pool');
const ejs = require('ejs');


function sqlTemplate () {
  return new Proxy({}, {
    get(target, propKey, receiver) {
      return function (params) {
        let arr = propKey.split('_');
        let json = require(`../sqltempl/${arr[0]}.json`);
        return sqlOperaRes(ejs.render(json[arr[1]], params, { delimiter: '%' }))
      }
    }
  });
}

function sqlOperaRes (sql) {
  console.log('sql:', sql);
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

module.exports = sqlTemplate;