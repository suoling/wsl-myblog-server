const sqlTemplate = require('../libs/sqlTemplate')


sqlTemplate().comment_commentQueryByArticleIdSQL({ article_id: 19 }).then((data)=>{
    console.log(data)
});

const exampleArr = [
    {
        name: 'wsl',
        age: '26'
    },
    {
        name: 'yyy',
        age: '26'
    }
];

let obj = {
    name: 'yyy',
    age: '26'
};

console.log('boolean:', exampleArr.includes(obj)); // false