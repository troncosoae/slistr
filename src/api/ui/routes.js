const Router = require('koa-router')
const listsController = require('../lists/controller')
const itemsController = require('../items/controller')
const isValidUuid = require('../../tools/isValidUuid')

const router = Router()

router.get('/', async ctx => {
    await ctx.render('ui/home.html.ejs')
})

router.get('/newList', async ctx => {
    await ctx.render('ui/new_list.html.ejs')
})

router.get('/list/:lid/:usr', async ctx => {
    console.log(ctx.params)
    const usr = ctx.params.usr
    const lid = ctx.params.lid
    console.log(lid)
    if (!isValidUuid(lid)) {
        await ctx.render('ui/error.html.ejs', {
            backRoute: '/',
            title: 'List not found',
            message: `The list key ${lid} is invalid.`
        })
    } else {
        const list = await listsController.getById(lid)
        const items = await listsController.getItems(lid)
        console.log(list)
        console.log(items)
        console.log(usr)
        if (list === undefined) {
            await ctx.render('ui/error.html.ejs', {
                backRoute: '/',
                title: 'List not found',
                message: `The list for key ${lid} has not been found.`
            })
        } else {
            await ctx.render('ui/show_list.html.ejs', {
                usr: usr,
                list: list,
                lid: list.lid, 
                items: items,
            })
        }
    }
})

router.get('/list/:lid', async ctx => {
    console.log(ctx.params)
    const lid = ctx.params.lid
    console.log(lid)
    if (!isValidUuid(lid)) {
        await ctx.render('ui/error.html.ejs', {
            backRoute: '/',
            title: 'List not found',
            message: `The list key ${lid} is invalid.`
        })
    } else {
        const list = await listsController.getById(lid)
        const items = await listsController.getItems(lid)
        console.log(list)
        console.log(items)
        if (list === undefined) {
            await ctx.render('ui/error.html.ejs', {
                backRoute: '/',
                title: 'List not found',
                message: `The list for key ${lid} has not been found.`
            })
        } else {
            await ctx.render('ui/enter_user.html.ejs', {
                lid: list.lid,
            })
        }
    }
})

router.post('/getNewList', async ctx => {
    console.log(ctx.request.body)
    const usr = ctx.request.body.usr
    const listName = ctx.request.body.name
    const list = await listsController.create({name: listName})
    ctx.redirect(`/list/${list.lid}/${usr}`)
})

router.post('/getList', async ctx => {
    console.log(ctx.request.body)
    ctx.redirect(`/list/${ctx.request.body.lid}/${ctx.request.body.usr}`)
})

router.post('/getListAddUser', async ctx => {
    console.log(ctx.request.body)
    ctx.redirect(`/list/${ctx.request.body.lid}/${ctx.request.body.usr}`)
})

router.post('/addItem', async ctx => {
    console.log('addItem', ctx.request.body)
    const params = {
        name: ctx.request.body.name,
        lid: ctx.request.body.lid,
        checked: false,
        quantity: parseInt(ctx.request.body.quantity),
        usr: ctx.request.body.usr,
    }
    const item = await itemsController.create(params)
    ctx.redirect(`/list/${params.lid}/${params.usr}`)
})

router.post('/changeItemStatus', async ctx => {
    console.log('changeItemStatus', ctx.request.body)
    const params = {
        iid: ctx.request.body.iid,
        name: ctx.request.body.name,
        lid: ctx.request.body.lid,
        usr: ctx.request.body.usr,
        quantity: parseInt(ctx.request.body.quantity),
        checked: ctx.request.body.status
    }
    const item = await itemsController.update(params)
    ctx.redirect(`/list/${ctx.request.body.lid}/${ctx.request.body.usr}`)
})

router.post('/deleteItem', async ctx => {
    console.log('changeItemStatus', ctx.request.body)
    const params = {
        iid: ctx.request.body.iid,
    }
    const item = await itemsController.delete(params)
    ctx.redirect(`/list/${ctx.request.body.lid}/${ctx.request.body.usr}`)
})

module.exports = router
