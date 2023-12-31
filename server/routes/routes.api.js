const router  = require('express').Router()
const authRouter = require('../modules/auth/routes')
const userRouter = require('../modules/users/routes')
const categoryRouter = require('../modules/categories/routes')
const productRouter = require('../modules/products/routes')
const orderRouter = require('../modules/orders/routes')

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/categories', categoryRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)

router.all('*', (req,res,next)=>{
    res.json({data:"", msg:"Route not found"})
})
module.exports= router