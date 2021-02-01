const { Pool } = require('pg')
require('dotenv').config()

const node_env = process.env.NODE_ENV

exports.start = async function() {

    let pool_params

    if (node_env === 'development') {
        const user = process.env.DB_USER
        const host = process.env.DB_HOST
        const database = process.env.DB_NAME
        const password = process.env.DB_PSWD
        const port = process.env.DB_PORT

        console.log(`db => ${database}:${port}`)

        pool_params = {user, host, database, password, port}

    } else {
        const db_url = process.env.DATABASE_URL
        console.log(`db => ${db_url}`)
        pool_params = {
            connectionString: db_url,
            ssl: {
                rejectUnauthorized: false
            }
        }        
    }
    
    this.pool = new Pool(pool_params)
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
