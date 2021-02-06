const Router = require('koa-router')
const controller = require('./controller')
const listsController = require('../lists/controller')

const router = Router()

router.get('/', async ctx => {
    const items = await controller.readAll()
    await ctx.render('items/read.html.ejs', {
        items: items
    })
})

router.get('/create', async ctx => {
    const lists = await listsController.readAll()
    await ctx.render('items/create.html.ejs', {
        lists: lists
    })
})

router.get('/update', async ctx => {
    const items = await controller.readAll()
    const lists = await listsController.readAll()
    await ctx.render('items/update.html.ejs', {
        items: items,
        lists: lists
    })
})

router.get('/delete', async ctx => {
    const items = await controller.readAll()
    await ctx.render('items/delete.html.ejs', {
        items: items
    })
})


router.post('/create', async ctx => {
    const params = ctx.request.body
    params.checked = 'checkbox' in params ? true : false
    console.log(params)
    const item = await controller.create(params)
    console.log('created:', item)
    ctx.redirect('/items')
})

router.post('/update', async ctx => {
    const params = ctx.request.body
    params.checked = 'checkbox' in params ? true : false
    console.log(params)
    const result = await controller.update(params)
    console.log('updated:', result)
    ctx.redirect('/items')
})

router.post('/delete', async ctx => {
    console.log(ctx.request.body)
    const params = ctx.request.body
    await controller.delete(params)
    ctx.redirect('/items')
})


module.exports = router
