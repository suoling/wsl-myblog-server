const sqlTemplate = require('../libs/sqlTemplate')

const articleMapper = {
  articleQueryAll (page_size, page_num) {
    const start = page_size * page_num;
    const end = page_num;
    return sqlTemplate().article_articleQueryAllSQL({ start, end })
  },
  articleQueryAllCount () {
    return sqlTemplate().article_articleQueryAllCountSQL()
  },
  articleQueryByUserId (user_id, page_size, page_num) {
    const start = page_size * page_num;
    const end = page_num
    return sqlTemplate().article_articleQueryByUserIdSQL({ user_id, start, end })
  },
  articleQueryByUserIdCount (user_id) {
    return sqlTemplate().article_articleQueryByUserIdCountSQL({ user_id })
  },
  articlePublish (user_id, title, description, md_content, html_code) {
    return sqlTemplate().article_articlePublishSQL({ user_id, title, description, md_content, html_code })
  },
  articleDelete (id) {
    return sqlTemplate().article_articleDeleteSQL({ id })
  },
  articleDetail (id) {
    return sqlTemplate().article_articleDetailSQL({ id })
  },
  articleUpdateById (id, title, description, md_content, html_code) {
    return sqlTemplate().article_articleUpdateByIdSQL({ id, title, description, md_content, html_code })
  }
}

module.exports = articleMapper