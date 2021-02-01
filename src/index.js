const Koa = require('koa')
const KoaResponseTime = require('koa-response-time')
const router = require('./routing/index')

const app = new Koa()

app.use(KoaResponseTime())
app.use(router.routes())

exports.start = async function() {
    try {
        this.server = await app.listen(3000)
        console.log('Listening to PORT 3000')
    } catch (error) {
        console.log(error)
    }
}

exports.close = async function() {
    await this.server.close()
}