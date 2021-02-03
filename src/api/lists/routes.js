const Router = require('koa-router')
const controller = require('./controller')

const router = Router()

router.get('/', async ctx => {
    const lists = await controller.readAll()
    await ctx.render('lists/read.html.ejs', {
        lists: lists
    })
})

router.get('/create', async ctx => {
    await ctx.render('lists/create.html.ejs')
})

router.get('/update', async ctx => {
    const lists = await controller.readAll()
    await ctx.render('lists/update.html.ejs', {
        lists: lists
    })
})

router.post('/create', async ctx => {
    console.log(ctx.request.body)
    const params = ctx.request.body
    const list = await controller.create(params)
    console.log('created:', list)
    ctx.redirect('/lists')
})

router.post('/update', async ctx => {
    console.log(ctx.request.body)
    const params = ctx.request.body
    const result = await controller.update(params)
    console.log('updated:', result)
    ctx.redirect('/lists')
})

module.exports = router
