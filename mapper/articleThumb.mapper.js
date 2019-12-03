const sqlTemplate = require('../libs/sqlTemplate')

const articleThumbMapper = {
    articleThumbQuery (article_id) {
        return sqlTemplate().articleThumb_articleThumbQuerySQL({ article_id })
    },
    articleThumbFlag (user_id, article_id) {
        return sqlTemplate().articleThumb_articleThumbFlagSQL({ user_id, article_id })
    },
    articleThumb (user_id, article_id) {
        return sqlTemplate().articleThumb_articleThumbSQL({ user_id, article_id })
    },
    articleThumbCancel (user_id, article_id) {
        return sqlTemplate().articleThumb_articleThumbCancelSQL({ user_id, article_id })
    }
};

module.exports = articleThumbMapper;