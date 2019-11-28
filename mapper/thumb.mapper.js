const sqlTemplate = require('../libs/sqlTemplate')

const thumbMapper = {
    thumbQuery (article_id) {
        return sqlTemplate().thumb_thumbQuerySQL({ article_id })
    },
    thumbFlag (user_id, article_id) {
        return sqlTemplate().thumb_thumbFlagSQL({ user_id, article_id })
    },
    thumb (user_id, article_id) {
        return sqlTemplate().thumb_thumbSQL({ user_id, article_id })
    },
    thumbCancel (user_id, article_id) {
        return sqlTemplate().thumb_thumbCancelSQL({ user_id, article_id })
    }
}

module.exports = thumbMapper