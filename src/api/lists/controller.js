const List = require('./model')

exports.create = async function(params) {
    const { lid } = await List.create(params)
    const list = await List.getById(lid)
    return list
}

exports.update = async function(params) {
    const returned = await List.update(params)
    console.log(returned)
    const list = await List.getById(params.lid)
    return list
}

exports.delete = async function(params) {
    const returned = await List.delete(params)
}

exports.readAll = async function() {
    const result = await List.getAll()
    return result.rows
}

exports.getById = async function(lid) {
    const result = await List.getById(lid)
    console.log(result)
    return result
}

exports.getItems = async function(lid) {
    const result = await List.getItems(lid)
    return result.rows
}
