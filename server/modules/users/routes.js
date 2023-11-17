const router = require("express").Router()
const controller = require('./controller')

router.post('/register',async(req,res)=>{
    console.log(req.body)
    const result = await controller.register(payload)
    res.json({data:result, msg:"success"})
})



module.exports= router