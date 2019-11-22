const sqlTemplate = require('../libs/sqlOperateRes')


sqlTemplate().user_userQueryAll().then((data)=>{
  console.log(data)
})