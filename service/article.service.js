const articleMapper = require('../mapper/article.mapper')

const articleService = {
  articleQueryByUserId (user_id) {
    return articleMapper.articleQueryByUserId(user_id)
  },
  articlePublish (user_id, title, description, md_content) {
    return articleMapper.articlePublish(user_id, title, description, md_content)
  },
  articleDelete (id, user_id) {
    return articleMapper.articleDelete(id, user_id)
  },
  articleQueryById (id, user_id) {
    return articleMapper.articleQueryById(id, user_id)
  },
  articleUpdateById (id, user_id, title, description, md_content) {
    return articleMapper.articleUpdateById(id, user_id, title, description, md_content)
  }
}

module.exports = articleService