const slugify = require("slugify");
const model = require("./model");

const slugGenerator = async (payload) => {
  return await slugify(payload, { lower: true, strict: false });
};

const create = async (payload) => {
  payload.slug = await slugGenerator(payload.name);
  return await model.create(payload);
};

const list = async (limit, page, search) => {
  page = Number(page) || 1;
  limit = Number(limit) || 1;
  const { isArchived } = search;
  return await model
    .aggregate([
      {
        $match: { isArchived: Boolean(isArchived) || false },
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
};

const getById=async(id)=>{
  await model.findOne({_id:id})
}
const updateById=async(id,payload)=>{
  payload.slug = slugGenerator(payload.name)
  await model.findOneAndUpdate({_id:id}, payload, {new:true})
}



module.exports = { create, list,getById,updateById };
