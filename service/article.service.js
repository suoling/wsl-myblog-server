const articleMapper = require('../mapper/article.mapper');
const articleThumbService = require('./articleThumb.service');
const commentService = require('../service/comment.service');
const cheerio = require('cheerio');
const transfer = require('../const/transfer');

const articleService = {
  async articleQueryAll (type, user_id, page_size, page_num) {
    const result = await articleMapper.articleQueryAll(page_size, page_num);
    return resultOpera(result, user_id, type);
  },
  async articleQueryByUserId (type, user_id, page_size, page_num) {
    const result = await articleMapper.articleQueryByUserId(user_id, page_size, page_num);
    return resultOpera(result, user_id, type);
  },
  articlePublish (user_id, title, md_content, html_code) {
    const description = descOpera(html_code);
    return articleMapper.articlePublish(user_id, title, description, md_content, html_code)
  },
  articleDelete (id) {
    return articleMapper.articleDelete(id)
  },
  async articleDetail (id) {
    const result = await articleMapper.articleDetail(id);
    return Object.assign({}, result[0], { md_content: transfer(result[0].md_content) });
  },
  articleUpdateById (id, title, md_content, html_code) {
    const description = descOpera(html_code);
    return articleMapper.articleUpdateById(id, title, description, md_content, html_code)
  }
}

async function resultOpera (result, login_id, type) {
  // await result.map(async item => {
  //   // 将html字符串中个别特殊的字符进行反转义
  //   item.html_code = transfer(item.html_code);
  //   item.description = transfer(item.description);
  //   // 获取文章的点赞数
  //   const thumbCount = await articleThumbService.articleThumbQuery(item.id);
  //   item.thumb_count = thumbCount[0].count;
  //   // 判断用户是否已点赞
  //   const thumbFlag = await articleThumbService.articleThumbFlag(login_id, item.id);
  //   item.thumb_flag = thumbFlag[0].count; // 1 代表已点赞。0 代表未点赞
  //   // 获取文章的评论数
  //   const commentCount = await commentService.commentQueryByArticleId(item.id);
  //   console.log(item.id, commentCount)
  //   item.comment_count = commentCount[0].count;
  //   console.log(item.id, commentCount, item.comment_count)
  // });
  for (let i = 0, len = result.length; i < len; i++) {
    // 将html字符串中个别特殊的字符进行反转义
    result[i].html_code = transfer(result[i].html_code);
    result[i].description = transfer(result[i].description);
    // 获取文章的点赞数
    const thumbCount = await articleThumbService.articleThumbQuery(result[i].id);
    result[i].thumb_count = thumbCount[0].count;
    // 判断用户是否已点赞
    const thumbFlag = await articleThumbService.articleThumbFlag(login_id, result[i].id);
    result[i].thumb_flag = thumbFlag[0].count; // 1 代表已点赞。0 代表未点赞
    // 获取文章的评论数
    const commentCount = await commentService.commentQueryByArticleId(result[i].id);
    result[i].comment_count = commentCount[0].count;
  }
  // 获取文章列表总条数
  let total_count;
  if (type === 'all') {
    total_count = await articleMapper.articleQueryAllCount(login_id);
  } else if (type === 'mine') {
    total_count = await articleMapper.articleQueryByUserIdCount(login_id);
  }
  return {
    articleList: result,
    totalCount: total_count[0].count
  }
}

function descOpera (html_code) {
  const $ = cheerio.load(html_code);
  const pEleText = $('p').text();
  return pEleText.length > 300 ? `${pEleText.slice(0, 300)}...` : `${pEleText}...`;
}

module.exports = articleService;