const commentMapper = require('../mapper/comment.mapper');
const userService = require('./user.service');
const commentThumbService = require('./commentThumb.service');

const commentService = {
    async commentQueryAll (article_id, login_id) {
        const result = await commentMapper.commentQueryAll(article_id);
        for (let i = 0, len = result.length; i < len; i++) {
            // 获取评论的用户昵称
            const userData = await userService.userQueryByUserId(result[i].user_id);
            result[i].nickname = userData[0].nickname;
            // 获取评论的点赞数
            const thumbCount = await commentThumbService.commentThumbQuery(result[i].id);
            result[i].thumb_count = thumbCount[0].count;
            // 判断用户是否已点赞
            const thumbFlag = await commentThumbService.commentThumbFlag(login_id, result[i].id);
            result[i].thumb_flag = thumbFlag[0].count; // 1 代表已点赞。0 代表未点赞
        }
        // 主评论的列表
        const commentArr = result.filter(item => item.prev_id === 0);
        commentArr.forEach(item =>{
            item.children = [];
            item.reply_user = ''
        });
        // 回复的列表
        const replyArr = result.filter(item => item.prev_id !== 0);

        replyArr.forEach(replyItem => {
            let parentNode = result.find(parentItem => {
                return parentItem.id === replyItem.prev_id
            });
            let existFlag = commentArr.findIndex(item => {
                return item.id === parentNode.id
            });
            if (existFlag !== -1) {
                parentNode.children.push(replyItem);
                replyItem.reply_user = parentNode.nickname
            } else {
                commentArr.forEach(item => {
                    if (item.children.length) {
                        const existChildFlag = item.children.findIndex(childItem => {
                            return childItem.id === replyItem.prev_id
                        });
                        if (existChildFlag !== -1) {
                            item.children.push(replyItem);
                            replyItem.reply_user = item.children[existChildFlag].nickname
                        }
                    }
                })
            }
        });
        return commentArr
    },
    commentQueryByArticleId (article_id) {
        return commentMapper.commentQueryByArticleId(article_id)
    },
    commentAdd (user_id, article_id, prev_id, content) {
        return commentMapper.commentAdd(user_id, article_id, prev_id, content)
    },
    commentDelete (comment_id) {
        return commentMapper.commentDelete(comment_id)
    },
};

module.exports = commentService;