const router  = require('express').Router()
const authRouter = require('../modules/auth/routes')
const userRouter = require('../modules/users/routes')

router.use('/auth', authRouter)
router.use('/users', userRouter)

router.all('*', (req,res,next)=>{
    res.json({data:"", msg:"Route not found"})
})
module.exports= router