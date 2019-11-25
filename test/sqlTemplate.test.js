const sqlTemplate = require('../libs/sqlTemplate')


sqlTemplate().user_userQueryAllSQL().then((data)=>{
  console.log(data)
})