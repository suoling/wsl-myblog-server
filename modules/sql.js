// SQL语句封裝
var user = {
  insert:'INSERT INTO user_data(phone, pass) VALUES(?,?)',
  update:'UPDATE user_data SET phone=?, pass=? WHERE id=?',
  delete: 'DELETE FROM user_data WHERE id=?',
  queryById: 'SELECT * FROM user_data WHERE id=?',
  queryByPhone: 'SELECT * FROM user_data WHERE phone=?',
  queryAll: 'SELECT * FROM user_data',
  loginVerify: 'SELECT * FROM user_data WHERE phone=? and pass=?',
};

module.exports = user;