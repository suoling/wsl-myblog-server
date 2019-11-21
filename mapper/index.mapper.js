const pool = require('../libs/pool')
const ejs = require('ejs')
const json = require('../sqltempl/index.json')

const indexMapper = {
  queryAll () {
    return sqlOperateRes(ejs.render(json.queryAllSQL, { delimiter: '%' }))
  },
  insert (name, age, address) {
    return sqlOperateRes(ejs.render(json.insertSQL, { name, age, address }, { delimiter: '%' }))
  },
  deleteById (id) {
    return sqlOperateRes(ejs.render(json.deleteByIdSQL, { id }, { delimiter: '%' }))
  },
  updateById (id, name, age, address) {
    return sqlOperateRes(ejs.render(json.updateByIdSQL, { name, age, address, id }, { delimiter: '%' }))
  },
  queryById (id) {
    return sqlOperateRes(ejs.render(json.queryByIdSQL, { id }, { delimiter: '%' }))
  },
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

module.exports = indexMapper