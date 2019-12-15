const userMapper = require('../mapper/user.mapper')

const userService = {
  userRegister (phone, nickname, pass) {
    return userMapper.userRegister(phone, nickname, pass)
  },
  userIsRegister (phone) {
    return userMapper.userIsRegister(phone)
  },
  userLogin (phone, pass) {
    return userMapper.userLogin(phone, pass)
  },
  userQueryByUserId (id) {
    return userMapper.userQueryByUserId(id)
  }
};

module.exports = userService;