const slugify = require("slugify");
const model = require("./model");

const slugGenerator = async (payload) => {
  return await slugify(payload, { lower: true, strict: false });
};

const create = async (payload) => {
  payload.slug = await slugGenerator(payload.name);
  return await model.create(payload);
};

const list = async ({limit, page, search}) => {

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 3;
  console.log(page,limit)
  const { isArchived } = search;
  const response =  await model
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
    const newData = response[0];
    let{data,total}= newData;
    total = total || 0;
    return {data,total,limit,page}
};

const getById=async(id)=>{
  await model.findOne({_id:id})
}
const updateById=async(id,payload)=>{
  payload.slug = slugGenerator(payload.name)
  await model.findOneAndUpdate({_id:id}, payload, {new:true})
}



module.exports = { create, list,getById,updateById };
