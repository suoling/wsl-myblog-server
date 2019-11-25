const sqlTemplate = require('../libs/sqlTemplate')

const articleMapper = {
  articleQueryByUserId (user_id) {
    return sqlTemplate().article_articleQueryByUserIdSQL({user_id})
  },
  articlePublish (user_id, title, description, md_content) {
    return sqlTemplate().article_articlePublishSQL({user_id, title, description, md_content})
  },
  articleDelete (id, user_id) {
    return sqlTemplate().article_articleDeleteSQL({id, user_id})
  },
  articleQueryById (id, user_id) {
    return sqlTemplate().article_articleQueryByIdSQL({id, user_id})
  },
  articleUpdateById (id, user_id, title, description, md_content) {
    return sqlTemplate().article_articleUpdateByIdSQL({id, user_id, title, description, md_content})
  }
}

module.exports = articleMapper