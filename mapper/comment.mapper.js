const sqlTemplate = require('../libs/sqlTemplate');

const commentMapper = {
    commentQuery (user_id, article_id) {
        return sqlTemplate().comment_commentQuerySQL({ user_id, article_id })
    },
    commentAdd (user_id, article_id, prev_id, content) {
        return sqlTemplate().comment_commentAddSQL({ user_id, article_id, prev_id, content })
    }
}

module.exports = commentMapper;