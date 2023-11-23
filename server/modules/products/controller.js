const model = require('./model')

const create =async(payload)=>{
    return await model.create(payload)

}

const list = async(limit,page,search)=>{
    await model.find()
}

const getById = async(id)=>{

}

const updateById=async(id,payload)=>{
    const {products,...rest}= payload;
    return await model.findOneAndUpdate({_id:id
    },rest,{new:true})
}

const deleteById = async(id,payload)=>{
    return await model.findOneAndUpdate({_id:id},payload,{new:true})
}







module.exports ={}