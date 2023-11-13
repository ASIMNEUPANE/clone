const router = require("express").Router()
const userROuter = require('../modules/users/user.routes')
const authRouter = require('../modules/auth/auth.routes')

router.use('/users', userROuter)
router.use('/auth', authRouter)


module.exports =router