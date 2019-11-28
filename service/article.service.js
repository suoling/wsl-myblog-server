const articleMapper = require('../mapper/article.mapper')

const articleService = {
  articleQueryAll () {
    return articleMapper.articleQueryAll()
  },
  articleQueryByUserId (user_id) {
    return articleMapper.articleQueryByUserId(user_id)
  },
  articlePublish (user_id, title, description, md_content, html_code) {
    return articleMapper.articlePublish(user_id, title, description, md_content, html_code)
  },
  articleDelete (id) {
    return articleMapper.articleDelete(id)
  },
  articleQueryById (id) {
    return articleMapper.articleQueryById(id)
  },
  articleUpdateById (id, title, description, md_content, html_code) {
    return articleMapper.articleUpdateById(id, title, description, md_content, html_code)
  }
}

module.exports = articleService