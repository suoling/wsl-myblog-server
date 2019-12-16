const sqlTemplate = require('../libs/sqlTemplate');

const commentMapper = {
    commentQueryAll (article_id) {
        return sqlTemplate().comment_commentQueryAllSQL({ article_id })
    },
    commentQueryByArticleId (article_id) {
        return sqlTemplate().comment_commentQueryByArticleIdSQL({ article_id })
    },
    commentAdd (user_id, article_id, prev_id, content) {
        return sqlTemplate().comment_commentAddSQL({ user_id, article_id, prev_id, content })
    },
    commentDelete (id) {
        return sqlTemplate().comment_commentDeleteSQL({ id })
    }
};

module.exports = commentMapper;