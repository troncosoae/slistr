const KoaRouter = require('koa-router')
const lists = require('./api/lists/routes')

const router = KoaRouter()

router.get('/', async ctx => {
    ctx.status = 200
    ctx.body = 'Hello World!'
})

router.use('/lists', lists.routes())

module.exports = router
