const sqlTemplate = require('../libs/sqlTemplate')

const articleMapper = {
  articleQueryAll () {
    return sqlTemplate().article_articleQueryAllSQL()
  },
  articleQueryByUserId (user_id) {
    return sqlTemplate().article_articleQueryByUserIdSQL({ user_id })
  },
  articlePublish (user_id, title, description, md_content) {
    return sqlTemplate().article_articlePublishSQL({ user_id, title, description, md_content })
  },
  articleDelete (id) {
    return sqlTemplate().article_articleDeleteSQL({ id })
  },
  articleQueryById (id) {
    return sqlTemplate().article_articleQueryByIdSQL({ id })
  },
  articleUpdateById (id, title, description, md_content) {
    return sqlTemplate().article_articleUpdateByIdSQL({ id, title, description, md_content })
  }
}

module.exports = articleMapper