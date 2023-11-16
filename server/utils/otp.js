require("dotenv").config();
const {totp} = require("otplib")

totp.options = { digits: 6, step: +process.env.JWT_DURATION };

const generateOtp = ()=>{
    totp.options={digits:6, step : process.env.JWT_DURATION};
    return totp.generate(process.env.JWT_SECRET)
}

const verifyOtp = (token)=>{
    return totp.check(token, process.env.OTP_SECRET)
}


module.exports = {generateOtp,verifyOtp};
