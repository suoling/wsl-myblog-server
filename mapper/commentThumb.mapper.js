const sqlTemplate = require('../libs/sqlTemplate')

const commentThumbMapper = {
    commentThumbQuery (comment_id) {
        return sqlTemplate().commentThumb_commentThumbQuerySQL({ comment_id })
    },
    commentThumbFlag (user_id, comment_id) {
        return sqlTemplate().commentThumb_commentThumbFlagSQL({ user_id, comment_id })
    },
    commentThumb (user_id, comment_id) {
        return sqlTemplate().commentThumb_commentThumbSQL({ user_id, comment_id })
    },
    commentThumbCancel (user_id, comment_id) {
        return sqlTemplate().commentThumb_commentThumbCancelSQL({ user_id, comment_id })
    }
};

module.exports = commentThumbMapper;