const router  = require('express').Router()
const authRouter = require('../modules/auth/routes')
const userRouter = require('../modules/users/routes')
const categoryRouter = require('../modules/categories/routes')

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/categories', categoryRouter)

router.all('*', (req,res,next)=>{
    res.json({data:"", msg:"Route not found"})
})
module.exports= router