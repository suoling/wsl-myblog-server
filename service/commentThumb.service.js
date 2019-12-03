const commentThumbMapper = require('../mapper/commentThumb.mapper');

const commentThumbService = {
    commentThumbQuery (comment_id) {
        return commentThumbMapper.commentThumbQuery(comment_id)
    },
    commentThumbFlag (user_id, comment_id) {
        return commentThumbMapper.commentThumbFlag(user_id, comment_id)
    },
    async commentThumb (user_id, comment_id) {
        const result = await this.commentThumbFlag(user_id, comment_id);
        const thumb_flag = result[0].count;
        if (thumb_flag === 0) {
            return commentThumbMapper.commentThumb(user_id, comment_id)
        } else if (thumb_flag === 1) {
            return new Error('已经点赞，不能再点')
        } else {
            return new Error('操作失败')
        }
    },
    commentThumbCancel (user_id, comment_id) {
        return commentThumbMapper.commentThumbCancel(user_id, comment_id)
    }
};

module.exports = commentThumbService;