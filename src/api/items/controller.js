const Item = require('./model')

exports.create = async function(params) {
    const { iid } = await Item.create(params)
    const item = await Item.getById(iid)
    return item
}

exports.update = async function(params) {
    const returned = await Item.update(params)
    console.log(returned)
    const item = await Item.getById(params.iid)
    return item
}

exports.delete = async function(params) {
    await Item.delete(params)
}

exports.readAll = async function() {
    const result = await Item.getAll()
    return result.rows
}
