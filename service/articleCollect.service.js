const articleCollectMapper = require('../mapper/articleCollect.mapper');
const articleMapper = require('../mapper/article.mapper');
const articleThumbService = require('./articleThumb.service');
const commentService = require('./comment.service');
const transfer = require('../const/transfer');

const articleCollectService = {
    async articleQueryByUserId ( user_id, page_size, page_num) {
        const collectResult = await articleCollectMapper.articleCollectQuery(user_id, page_size, page_num);
        const result = [];
        for (let i = 0, len = collectResult.length; i < len; i++) {
            const articleResult = await articleMapper.articleDetail(collectResult[i].article_id);
            // 将html字符串中个别特殊的字符进行反转义
            articleResult[0].html_code = transfer(articleResult[0].html_code);
            articleResult[0].description = transfer(articleResult[0].description);
            // 获取文章的点赞数
            const thumbCount = await articleThumbService.articleThumbQuery(articleResult[0].id);
            articleResult[0].thumb_count = thumbCount[0].count;
            // 判断用户是否已点赞
            const thumbFlag = await articleThumbService.articleThumbFlag(user_id, articleResult[0].id);
            articleResult[0].thumb_flag = thumbFlag[0].count; // 1 代表已点赞。0 代表未点赞
            // 获取文章的评论数
            const commentCount = await commentService.commentQueryByArticleId(articleResult[0].id);
            articleResult[0].comment_count = commentCount[0].count;
            // 判断用户是否已收藏
            const collectFlag = await this.articleCollectFlag(user_id, articleResult[0].id);
            articleResult[0].collect_flag = collectFlag[0].count; // 1 代表已收藏。0 代表未收藏
            result.push(articleResult[0])
        }
        const total_count = await articleCollectMapper.articleCollectQueryCount(user_id);
        return {
            articleList: result,
            totalCount: total_count[0].count
        }
    },
    articleCollectFlag (user_id, article_id) {
        return articleCollectMapper.articleCollectFlag(user_id, article_id)
    },
    articleCollect (user_id, article_id) {
        return articleCollectMapper.articleCollect(user_id, article_id)
    },
    articleCollectCancel (user_id, article_id) {
        return articleCollectMapper.articleCollectCancel(user_id, article_id)
    },
};

module.exports = articleCollectService;