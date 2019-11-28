const articleMapper = require('../mapper/article.mapper');
const thumbService = require('../service/thumb.service');
const cheerio = require('cheerio');
const transfer = require('../const/transfer');

const articleService = {
  async articleQueryAll (user_id) {
    const result = await articleMapper.articleQueryAll(user_id);
    return resultOpera(result, user_id)
  },
  async articleQueryByUserId (user_id) {
    const result = await articleMapper.articleQueryByUserId(user_id);
    return resultOpera(result, user_id)
  },
  articlePublish (user_id, title, md_content, html_code) {
    const description = descOpera(html_code);
    return articleMapper.articlePublish(user_id, title, description, md_content, html_code)
  },
  articleDelete (id) {
    return articleMapper.articleDelete(id)
  },
  async articleQueryById (id) {
    const result = await articleMapper.articleQueryById(id);
    const articleDetail = Object.assign({}, result[0], { md_content: transfer(result[0].md_content) });
    return articleDetail
  },
  articleUpdateById (id, title, md_content, html_code) {
    const description = descOpera(html_code);
    return articleMapper.articleUpdateById(id, title, description, md_content, html_code)
  }
}

async function resultOpera (result, login_id) {
  for (let i = 0, len = result.length; i < len; i++) {
    // 将html字符串中个别特殊的字符进行反转义
    result[i].html_code = transfer(result[i].html_code);
    result[i].description = transfer(result[i].description);
    // 获取文章的点赞数
    const thumbCount = await thumbService.thumbQuery(result[i].id);
    result[i].thumb_count = thumbCount[0].count;
    // 判断用户是否已点赞
    const thumbFlag = await thumbService.thumbFlag(login_id, result[i].id);
    result[i].thumb_flag = thumbFlag[0].count; // 1 代表已点赞。0 代表未点赞
  }
  return result
}

function descOpera (html_code) {
  const $ = cheerio.load(html_code);
  const pEleText = $('p').text();
  const description = pEleText.length > 300 ? `${pEleText.slice(0, 300)}...` : `${pEleText}...`;
  return description
}

module.exports = articleService;