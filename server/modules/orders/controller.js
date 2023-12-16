const { v4: uuidv4 } = require("uuid");
const model = require("./model");
const productModel = require("../../modules/products/model");

const create = async (payload) => {
  payload.id = uuidv4();
  const products = payload?.products;

  products.map(async (product) => {
    const { product: id, quantity } = product;
    const productInfo = await productModel.findOne({ _id: id });
    if (!productInfo) throw new Error("product not found");

    await productModel.findOneAndUpdate(
      { _id: id },
      { quantity: productInfo?.quantity - quantity },
      { new: true }
    );
  });
  return await model.create(payload);
};

const list = async (limit, page) => {
  limit = parseInt(limit) || 3;
  page = parseInt(page) || 3;

  const response = await model
    .aggregate([
      {
        $sort: {
          name: -1,
        },
      },
      {
        $facet: {
          metadata: [
            {
              $count: "total",
            },
          ],
          data: [
            {
              $skip: (page - 1) * limit,
            },
            {
              $limit: limit,
            },
          ],
        },
      },
      {
        $addFields: {
          total: {
            $arrayElemAt: ["$metadata.total", 0],
          },
        },
      },
      {
        $project: {
          metadata: 0,
        },
      },
    ])
    .allowDiskUse(true);

  const newData = response[0];
  let { data, total } = newData;
  return { data, total, limit };
};

const getById = async (id) => {
  return await model.findOne(id);
};

const updateById = async (id, payload) => {
  const { products, ...rest } = payload;
  return await model.findByIdAndUpdate({ id: id }, rest, { new: true });
};

const deleteById = async (id) => {
  const order = await model.findOne({ id });
  if (!order) throw new Error("product not found");

  const products = order?.product;
  products.map(async (product) => {
    const { product: id, quantity } = product;

    const productInfo = await productModel.findOne({ _id: id });
    if (!productInfo) throw new Error("product not found");
     await productModel.findOneAndUpdate(
      { _id: id },
      {
        quantity: productInfo?.quantity + quantity,
      },
      { new: true }
    );
  });
  return model.deleteOne({id})
};

const approve = async(id,payload)=>{
  const order = await model.findOne({id});
  if(!order) throw new Error ("order not found");
 return  await model.findOneAndUpdate({id}, {status:payload}, {new:true})
}

module.exports = { create, list, getById, updateById, deleteById ,approve};
