const thumbMapper = require('../mapper/thumb.mapper')

const thumbService = {
    thumbQuery (article_id) {
        return thumbMapper.thumbQuery(article_id)
    },
    thumbFlag (user_id, article_id) {
        return thumbMapper.thumbFlag(user_id, article_id)
    },
    thumb (user_id, article_id) {
        return thumbMapper.thumb(user_id, article_id)
    },
    thumbCancel (user_id, article_id) {
        return thumbMapper.thumbCancel(user_id, article_id)
    }
}

module.exports = thumbService