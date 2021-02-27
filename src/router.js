const KoaRouter = require('koa-router')
const uiRouter = require('./api/ui/routes')
const listsRouter = require('./api/lists/routes')
const itemsRuter = require('./api/items/routes')

const router = KoaRouter()

router.use('', uiRouter.routes())
router.use('/lists', listsRouter.routes())
router.use('/items', itemsRuter.routes())

module.exports = router
