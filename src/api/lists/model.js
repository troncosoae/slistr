const db = require('../../db')

exports.create = async function () {
    const now = new Date()
    return db.queryOne(
        `
        INSERT INTO Lists (inserted_at, updated_at) 
        VALUES ($1, $2) RETURNING *
        `,
        [now, now]
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
