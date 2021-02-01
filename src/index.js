const Koa = require('koa')
const KoaResponseTime = require('koa-response-time')
const router = require('./router')
const db = require('./db')

const app = new Koa()

const PORT = process.env.PORT || 3000;

app.use(KoaResponseTime())
app.use(router.routes())

exports.start = async function() {
    try {
        db_info = await db.start()
        this.server = await app.listen(PORT)
        console.log(`Listening to PORT ${PORT}`)
    } catch (error) {
        console.log(error)
    }
}

exports.close = async function() {
    await this.server.close()
}