const sqlTemplate = require('../libs/sqlTemplate')

const userMapper = {
  userRegister (phone, pass) {
    return sqlTemplate().user_userRegisterSQL({ phone, pass })
  },
  userIsRegister (phone) {
    return sqlTemplate().user_userIsRegisterSQL({ phone })
  },
  userLogin (phone, pass) {
    return sqlTemplate().user_userLoginSQL({ phone, pass })
  }
}

module.exports = userMapper