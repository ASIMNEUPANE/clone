const {Schema, model}= require('mongoose')

const authSchema = new Schema({
    email:{type:String},
    token:{type:Number}
})

module.exports = model("Auth", authSchema)