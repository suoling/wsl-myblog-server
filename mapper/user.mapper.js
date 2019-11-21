const pool = require('../libs/pool')
const ejs = require('ejs')
const json = require('../sqltempl/user.json')

const userMapper = {
  userRegister (phone, pass) {
    return sqlOperateRes(ejs.render(json.userRegisterSQL, { phone, pass }, { delimiter: '%' }))
  },
  userIsRegister (phone) {
    return sqlOperateRes(ejs.render(json.userIsRegisterSQL, { phone }, { delimiter: '%' }))
  },
  userLogin (phone, pass) {
    return sqlOperateRes(ejs.render(json.userLoginSQL, { phone, pass }, { delimiter: '%' }))
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

module.exports = userMapper