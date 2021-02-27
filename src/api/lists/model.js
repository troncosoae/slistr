const db = require('../../db')

exports.create = async function (params) {
    const now = new Date()
    return db.queryOne(
        `
        INSERT INTO Lists (inserted_at, updated_at, name) 
        VALUES ($1, $2, $3) RETURNING *
        `,
        [now, now, params.name]
    )
}

exports.update = async function (params) {
    const now = new Date()
    console.log(params)
    return db.queryOne(
        `
        UPDATE Lists SET 
        name = $1,
        updated_at = $2 
        WHERE lid = $3
        `,
        [params.name, now, params.lid]
    )
}

exports.delete = async function (params) {
    console.log(params)
    return db.queryOne(
        `
        DELETE FROM Lists 
        WHERE lid = $1
        `,
        [params.lid]
    )
}

exports.getAll = async function () {
    return db.query(
        'SELECT * FROM Lists',
        []
    )
}

exports.getById = async function (lid) {
    return db.queryOne(
        `
        SELECT * FROM Lists
        WHERE lid = $1
        `,
        [lid]
    )
}

exports.getItems = async function (lid) {
    return db.query(
        `
        SELECT * FROM Items
        WHERE lid = $1
        `,
        [lid]
    )
}
