const KoaRouter = require('koa-router')

const router = KoaRouter()

router.get('/', async ctx => {
    ctx.status = 200
    ctx.body = 'Hello World!'
})

module.exports = router
