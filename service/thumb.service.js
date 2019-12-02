const thumbMapper = require('../mapper/thumb.mapper');

const thumbService = {
    thumbQuery (article_id) {
        return thumbMapper.thumbQuery(article_id)
    },
    thumbFlag (user_id, article_id) {
        return thumbMapper.thumbFlag(user_id, article_id)
    },
    async thumb (user_id, article_id) {
        const result = await this.thumbFlag(user_id, article_id);
        const thumb_flag = result[0].count;
        if (thumb_flag === 0) {
            return thumbMapper.thumb(user_id, article_id)
        } else if (thumb_flag === 1) {
            return new Error('已经点赞，不能再点')
        } else {
            return new Error('操作失败')
        }
    },
    thumbCancel (user_id, article_id) {
        return thumbMapper.thumbCancel(user_id, article_id)
    }
};

module.exports = thumbService;