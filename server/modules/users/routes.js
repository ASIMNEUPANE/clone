const router = require("express").Router()
const controller = require('./controller')

router.get('/', async(req,res,next)=>{
    const {page,limit} = req.body
const result = await controller.list(page,limit)
res.json({data:result, msg:"success"})
})
router.get('/:id', async(req,res,next)=>{

const result = await controller.getById(req.params.id)
res.json({data:result, msg:"success"})
})


module.exports= router