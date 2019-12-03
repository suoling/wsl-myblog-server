const articleThumbMapper = require('../mapper/articleThumb.mapper');

const articleThumbService = {
    articleThumbQuery (article_id) {
        return articleThumbMapper.articleThumbQuery(article_id)
    },
    articleThumbFlag (user_id, article_id) {
        return articleThumbMapper.articleThumbFlag(user_id, article_id)
    },
    async articleThumb (user_id, article_id) {
        const result = await this.articleThumbFlag(user_id, article_id);
        const thumb_flag = result[0].count;
        if (thumb_flag === 0) {
            return articleThumbMapper.articleThumb(user_id, article_id)
        } else if (thumb_flag === 1) {
            return new Error('已经点赞，不能再点')
        } else {
            return new Error('操作失败')
        }
    },
    articleThumbCancel (user_id, article_id) {
        return articleThumbMapper.articleThumbCancel(user_id, article_id)
    }
};

module.exports = articleThumbService;