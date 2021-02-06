const KoaRouter = require('koa-router')
const listsRouter = require('./api/lists/routes')
const itemsRuter = require('./api/items/routes')

const router = KoaRouter()

router.get('/', async ctx => {
    ctx.status = 200
    ctx.body = 'Hello World!'
})

router.use('/lists', listsRouter.routes())
router.use('/items', itemsRuter.routes())

module.exports = router
