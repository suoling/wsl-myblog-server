const indexMapper = require('../mapper/index.mapper')

const indexService = {
  queryAll () {
    return indexMapper.queryAll()
  },
  insert (name, age, address) {
    return indexMapper.insert(name, age, address)
  },
  deleteById (id) {
    return indexMapper.deleteById(id)
  },
  updateById (id, name, age, address) {
    return indexMapper.updateById(id, name, age, address)
  },
  queryById (id) {
    return indexMapper.queryById(id)
  },
}

module.exports = indexService