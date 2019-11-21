const sqlOperateRes = require('../libs/sqlOperateRes')
const ejs = require('ejs')
const json = require('../sqltempl/index.json')

const indexMapper = {
  queryAll () {
    return sqlOperateRes(ejs.render(json.queryAllSQL, { delimiter: '%' }))
  },
  insert (name, age, address) {
    return sqlOperateRes(ejs.render(json.insertSQL, { name, age, address }, { delimiter: '%' }))
  },
  deleteById (id) {
    return sqlOperateRes(ejs.render(json.deleteByIdSQL, { id }, { delimiter: '%' }))
  },
  updateById (id, name, age, address) {
    return sqlOperateRes(ejs.render(json.updateByIdSQL, { name, age, address, id }, { delimiter: '%' }))
  },
  queryById (id) {
    return sqlOperateRes(ejs.render(json.queryByIdSQL, { id }, { delimiter: '%' }))
  },
}

module.exports = indexMapper