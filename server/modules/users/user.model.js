const {Schema,model} = require('mongoose');
const {commonSchema} = require('../../utils/commomSchema')

const userSchema = new Schema({
    name: {type:String,   required: true},
    email:{type:String,   required: true},
    password:{type:String,   required: true},
    roles:{
        type:Array,
        default:["user"],
        required: true
    },
    isActive:{type:Boolean, default:false},
    isEmailVerified:{type:Boolean, default:false},
    image:{type:String},
    ...commonSchema
})

module.exports = model("User", userSchema)
