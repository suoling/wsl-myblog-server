const commentMapper = require('../mapper/comment.mapper')

const commentService = {
    commentQuery (user_id, article_id) {
        return commentMapper.commentQuery(user_id, article_id)
    },
    commentAdd (user_id, article_id, prev_id, content) {
        return commentMapper.commentAdd(user_id, article_id, prev_id, content)
    }
};

module.exports = commentService;