const {Schema, model}= require('mongoose')
const {ObjectId}= Schema.Types;
const {commonSchema}= require('../../utils/commomSchema')
const orderSchema = new Schema({
    id:{type:String, required:true, index:{unique:true}},
    amount:{type:Number, required:true},
    products:[
        {
            quantity:{type:Number, required:true},
            price:{type:Number, required:true},
            amount:{type:Number},
            products:{type:ObjectId, ref:'Product', required:true},
        },
        
    ],
    paymentMethod:{
        type: String,
        enum:['COD','STRIPE'],
        default:'COD',
        required:true,
    },
    orderId:{type:String},
    address:{type:String},
    email: { type: String },
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    ...commonSchema,

    
})

module.exports = model('Order', orderSchema)



