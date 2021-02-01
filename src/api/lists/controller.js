const List = require('./model')

exports.create = async function() {
    const { lid } = await List.create()
    const list = await List.getById(lid)
    return list
}