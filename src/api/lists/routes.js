const Router = require('koa-router')
const controller = require('./controller')

const router = Router()

router.get('/', async ctx => {
    ctx.status = 200
    const lists = await controller.readAll()
    await ctx.render('lists/read.html.ejs', {
        lists: lists
    })
})

router.post('/', async ctx => {
    const list = await controller.create()
    ctx.body = list
})

module.exports = router
