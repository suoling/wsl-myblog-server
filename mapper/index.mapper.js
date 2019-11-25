const sqlTemplate = require('../libs/sqlTemplate')

const indexMapper = {
  queryAll () {
    return sqlTemplate().test_queryAllSQL()
  },
  insert (name, age, address) {
    return sqlTemplate().test_insertSQL({ name, age, address })
  },
  deleteById (id) {
    return sqlTemplate().test_deleteByIdSQL({ id })
  },
  updateById (id, name, age, address) {
    return sqlTemplate().test_updateByIdSQL({ name, age, address, id })
  },
  queryById (id) {
    return sqlTemplate().test_queryByIdSQL({ id })
  },
}

module.exports = indexMapper