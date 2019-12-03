const commentMapper = require('../mapper/comment.mapper');
const commentThumbService = require('./commentThumb.service');

const commentService = {
    async commentQueryAll (article_id, login_id) {
        const result = await commentMapper.commentQueryAll(article_id);
        for (let i = 0, len = result.length; i < len; i++) {
            // 获取评论的点赞数
            const thumbCount = await commentThumbService.commentThumbQuery(result[i].id);
            result[i].thumb_count = thumbCount[0].count;
            // 判断用户是否已点赞
            const thumbFlag = await commentThumbService.commentThumbFlag(login_id, result[i].id);
            result[i].thumb_flag = thumbFlag[0].count; // 1 代表已点赞。0 代表未点赞
        }
        // 主评论的列表
        const commentArr = result.filter(item => item.prev_id === 0)
        commentArr.forEach(item =>{
            item.children = []
        });
        // 回复的列表
        result.filter(item => item.prev_id !== 0)
            .forEach(childItem => {
            let parentNode = commentArr.find(parentItem => {
                return parentItem.id === childItem.prev_id
            });
            if (parentNode) {
                parentNode.children.push(childItem)
            }
        });
        return commentArr
    },
    commentQueryByArticleId (article_id) {
        return commentMapper.commentQueryByArticleId(article_id)
    },
    commentAdd (user_id, article_id, prev_id, content) {
        return commentMapper.commentAdd(user_id, article_id, prev_id, content)
    }
};

module.exports = commentService;