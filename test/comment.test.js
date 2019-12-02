const sqlTemplate = require('../libs/sqlTemplate')


sqlTemplate().comment_commentQueryByArticleIdSQL({ article_id: 19 }).then((data)=>{
    console.log(data)
})