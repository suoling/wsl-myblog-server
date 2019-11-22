const articleMapper = require('../mapper/article.mapper')

const articleService = {
  articleQueryByUserId (user_id) {
    return articleMapper.articleQueryByUserId(user_id)
  },
  articlePublish (user_id, title, description, text) {
    return articleMapper.articlePublish(user_id, title, description, text)
  },
  articleDelete (user_id, article_id) {
    return articleMapper.articleDelete(user_id, article_id)
  },
  articleQueryById (user_id, article_id) {
    return articleMapper.articleQueryById(user_id, article_id)
  },
  articleUpdateById (user_id, article_id, title, description, text) {
    return articleMapper.articleUpdateById(user_id, article_id, title, description, text)
  }
}

module.exports = articleService