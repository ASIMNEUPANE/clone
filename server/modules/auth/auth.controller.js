const model = require('./auth.model')
const {verifyOtp,generateOtp}= require('../../utils/otp')
const bcrypt = require("bcrypt")
const userModel = require('../users/user.model')

const register = async (paylaod)=>{
    const {password,roles, ...rest}= paylaod
rest.password = bcrypt.hash(password, process.env.SALT_ROUND)
const user = await userModel.create(rest)
const token = generateOtp()
 await model.create({email:user?.email, token})

}







module.exports = {register}