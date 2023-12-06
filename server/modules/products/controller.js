const model = require("./model");

const create = async (payload) => {
  return await model.create(payload);
};

const list = async ({limit, page, search}) => {
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  const { isArchived } = search;

  const response = await model.aggregate([
    {
      $match: {
        isArchived: Boolean(isArchived) || false,
      },
    },
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
  ]).allowDiskUse(true)

  const newData = response[0];
  let {total,data}= newData;
  total = total || 0;
  return {total,page,limit,data}
};

const getById = async (id) => {
  return await model.findOne({_id:id})
};

const updateById = async (id, payload) => {
  const { products, ...rest } = payload;
  return await model.findOneAndUpdate({ _id: id }, rest, { new: true });
};

const deleteById = async (id, payload) => {
  return await model.findOneAndUpdate({ _id: id }, payload, { new: true });
};

module.exports = { create, list,getById ,updateById,deleteById};
