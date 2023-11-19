const slugify = require("slugify");
const model = require("./model");

const slugGenerator = async(payload) => {
  return await slugify(payload, {lower:true, strict:false});
};

const create = async (payload) => {
  payload.slug = await slugGenerator(payload.name);
  return await model.create(payload);
};

const list = async(limit,page)=>{
    page = parent(page) || 1;
    limit = parent(limit) || 4

    await model.aggregate({

    })
}

module.exports = {create};
