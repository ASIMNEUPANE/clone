const router = require("express").Router()
const controller = require('./controller')

router.get('/', async(req,res,next)=>{
    const {page,limit} = req.body
const result = await controller.list(page,limit)
res.json({data:result, msg:"success"})
})


module.exports= router