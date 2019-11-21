const sqlOperateRes = require('../libs/sqlOperateRes')
const ejs = require('ejs')
const json = require('../sqltempl/article.json')

const articleMapper = {
  articleQueryByUserId (user_id) {
    return sqlOperateRes(ejs.render(json.articleQueryByUserIdSQL, { user_id }, { delimiter: '%' }))
  },
  articlePublish (user_id, title, description, text) {
    return sqlOperateRes(ejs.render(json.articlePublishSQL, { user_id, title, description, text }, { delimiter: '%' }))
  },
  articleDelete (user_id, article_id) {
    return sqlOperateRes(ejs.render(json.articleDeleteSQL, { user_id, article_id }, { delimiter: '%' }))
  },
  articleQueryById (user_id, article_id) {
    return sqlOperateRes(ejs.render(json.articleQueryByIdSQL, { user_id, article_id }, { delimiter: '%' }))
  },
}

module.exports = articleMapper