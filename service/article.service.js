const articleMapper = require('../mapper/article.mapper')

const articleService = {
  articleQueryByUserId (user_id) {
    return articleMapper.articleQueryByUserId(user_id)
  },
  articlePublish (user_id, title, description, text) {
    return articleMapper.articlePublish(user_id, title, description, text)
  }
}

module.exports = articleService