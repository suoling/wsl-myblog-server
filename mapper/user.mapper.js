const sqlTemplate = require('../libs/sqlTemplate')

const userMapper = {
  userRegister (phone, nickname, pass) {
    return sqlTemplate().user_userRegisterSQL({ phone, nickname, pass })
  },
  userIsRegister (phone) {
    return sqlTemplate().user_userIsRegisterSQL({ phone })
  },
  userLogin (phone, pass) {
    return sqlTemplate().user_userLoginSQL({ phone, pass })
  },
  userQueryByUserId (id) {
    return sqlTemplate().user_userQueryByUserIdSQL({ id })
  }
};

module.exports = userMapper;