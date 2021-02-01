const { Pool } = require('pg')
require('dotenv').config()

exports.start = async function() {
    // const user = process.env.DB_USER
    // const host = process.env.DB_HOST
    // const database = process.env.DB_NAME
    // const password = process.env.DB_PSWD
    // const port = process.env.DB_PORT

    // this.pool = new Pool({user, host, database, password, port})
    // return {user, host, database, password, port}
    
    this.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })
}

exports.close = async function() {
    return this.pool.end()
}

exports.query = async function(q, data) {
    return this.pool.query(q, data)
}

exports.queryOne = async function(q, data) {
    return this.pool.query(q, data).then(r => r.rows[0])
}
