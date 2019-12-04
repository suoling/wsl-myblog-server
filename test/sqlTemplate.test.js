const sqlTemplate = require('../libs/sqlTemplate')


sqlTemplate().user_userQueryAllSQL().then((data)=>{
  console.log(data)
})

sqlTemplate().article_articleQueryAllSQL({ start: 0, end: 10 }).then(res => {
  console.log('res:', res)
});


// sqlTemplate().comment_addCommentSQL({
//   user_id: 2,
//   article_id: 2,
//   prev_id: 0,
//   content: '我是测试的评论1'
// }).then(res => {
//   console.log('res:', res)
// }).catch(err => {
//   console.log('err:', err)
// });