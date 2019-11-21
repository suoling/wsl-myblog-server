const sqlOperateRes = require('../libs/sqlOperateRes')
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

module.exports = userMapper