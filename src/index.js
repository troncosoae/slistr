const Koa = require('koa')
const KoaResponseTime = require('koa-response-time')
const bodyParser = require('koa-bodyparser')
const render = require('koa-ejs')
const path = require('path')
const router = require('./router')
const db = require('./db')

const app = new Koa()

const PORT = process.env.PORT || 3000;

app.use(KoaResponseTime())

app.use(bodyParser())

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout.html.ejs',
    viewExt: '', 
    cache: false,
    debug: false
})

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