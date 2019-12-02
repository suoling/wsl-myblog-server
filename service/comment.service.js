const commentMapper = require('../mapper/comment.mapper')

const commentService = {
    async commentQueryAll (article_id) {
        const result = await commentMapper.commentQueryAll(article_id);
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