// 用正则表达式实现html解码（反转义）
const transfer = function (str) {
    let arrEntities={
        'lt':'<',
        'gt':'>',
        'nbsp':' ',
        'amp':'&',
        'quot':'"',
        '#39': "'",
        '#34': '"'
    };
    return str.replace(/&(lt|gt|nbsp|amp|quot|#39|#34);/ig,function(all,t){return arrEntities[t];});
}

module.exports = transfer