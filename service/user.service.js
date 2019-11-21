const userMapper = require('../mapper/user.mapper')

const userService = {
  userRegister (phone, pass) {
    return userMapper.userRegister(phone, pass)
  },
  userIsRegister (phone) {
    return userMapper.userIsRegister(phone)
  },
  userLogin (phone, pass) {
    return userMapper.userLogin(phone, pass)
  }
}

module.exports = userService