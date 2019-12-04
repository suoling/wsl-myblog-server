const sqlTemplate = require('../libs/sqlTemplate');

const articleCollectMapper = {
    articleCollectQuery (user_id, page_size, page_num) {
        const start = page_size * page_num;
        const end = page_num;
        return sqlTemplate().articleCollect_articleCollectQuerySQL({ user_id, start, end })
    },
    articleCollectFlag (user_id, article_id) {
        return sqlTemplate().articleCollect_articleCollectFlagSQL({ user_id, article_id })
    },
    articleCollectQueryCount (user_id) {
        return sqlTemplate().articleCollect_articleCollectQueryCountSQL({ user_id })
    },
    articleCollect (user_id, article_id) {
        return sqlTemplate().articleCollect_articleCollectSQL({ user_id, article_id })
    },
    articleCollectCancel (user_id, article_id) {
        return sqlTemplate().articleCollect_articleCollectCancelSQL({ user_id, article_id })
    }
};


module.exports = articleCollectMapper;