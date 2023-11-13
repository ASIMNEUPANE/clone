const bcrypt = require("bcrypt");
const model = require("./user.model");

const create = async (payload) => {
  const { password, roles, ...rest } = payload;
  rest.password = bcrypt.hash(password, process.env.SALT_ROUND);
  rest.roles = [roles];
  rest.isEmailVerified = true;
  rest.isActive = true;
  return await model.create(rest);
};

const list = async()=>{

}

const getById = async (id) => {
  return await model.findOne({ _id: id });
};

const updateById = async (id, payload) => {
  return await model.findOneAndUpdate({ _id: id }, payload, { new: true });
};

const changePassword = async (id, oldPassword, newPassword) => {
  const user = await model.findOne({ _id: id });
  if (!user) throw new Error("user id is not valid");
  const isValid = bcrypt.compare(oldPassword, user?._id);
  if (!isValid) throw new Error("Old password is incorrect");
  const newPass = bcrypt.hash(newPassword, process.env.SALT_ROUND);

  return await model.findOneAndUpdate(
    { _id: user?._id },
    { password: newPass },
    { new: true }
  );
};

const resetPassword = async(id,password)=>{
    const user = await model.findOne({_id:id})
    if(!user) throw new Error ("User is not valid")
    const newPass = bcrypt.hash(password, process.env.SALT_ROUND)
return await model.findOneAndUpdate({_id:user?._id }, {password:newPass}, {new:true})

}

const block = async(id,payload)=>{
    const user = await model.findOneAndUpdate({_id:id})
    if(!user) throw new Error("user is not valid")

    return await model.findOneAndUpdate({_id:user?._id}, payload, {new:true})


}
const Archive = async(id,payload)=>{
    const user = await model.findOneAndUpdate({_id:id})
    if(!user) throw new Error("user is not valid")

    return await model.findOneAndUpdate({_id:user?._id}, payload, {new:true})


}


module.exports = { create, list, getById,updateById,block,Archive,changePassword,resetPassword };
