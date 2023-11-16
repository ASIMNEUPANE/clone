const bcrypt = require("bcrypt")
const model = require('./auth.model')
const userModel = require('../users/user.model')

const {verifyOtp,generateOtp}= require('../../utils/otp')

const register = async (payload)=>{
    console.log(payload)
    let {password,roles, ...rest}= payload
rest.password = await bcrypt.hash(password, process.env.SALT_ROUND)
const user = await userModel.create(rest)
const token = generateOtp()
 return await model.create({email:user?.email, token})

}







module.exports = {register}