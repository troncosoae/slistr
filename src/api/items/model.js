const { Query } = require('pg')
const db = require('../../db')

exports.create = async function (params) {
    const now = new Date()
    return db.queryOne(
        `
        INSERT INTO Items (inserted_at, updated_at, name, lid, checked, quantity, usr, unit) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
        `,
        [now, now, params.name, params.lid, params.checked, parseFloat(params.quantity), params.usr, params.unit]
    )
}

exports.update = async function (params) {
    const now = new Date()
    console.log(params)
    return db.queryOne(
        `
        UPDATE Items SET 
        updated_at = $1,
        name = $2,
        lid = $3,
        checked = $4,
        quantity = $5,
        usr = $6,
        unit = $7
        WHERE iid = $8
        `,
        [now, params.name, params.lid, params.checked, parseFloat(params.quantity), params.usr, params.unit, params.iid]
    )
}


exports.delete = async function (params) {
    console.log(params)
    return db.queryOne(
        `
        DELETE FROM Items 
        WHERE iid = $1
        `,
        [params.iid]
    )
}

exports.getAll = async function () {
    return db.query(
        'SELECT * FROM Items',
        []
    )
}

exports.getById = async function (iid) {
    return db.queryOne(
        `
        SELECT * FROM Items
        WHERE iid = $1
        `,
        [iid]
    )
}
