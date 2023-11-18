const model = require("./model");
const bcrypt = require("bcrypt");

const create = async (payload) => {
  const { password, roles, ...rest } = payload;
  rest.password = await bcrypt.hash(password, process.env.SALT_ROUND);
  rest.isActive = true;
  rest.isEmailVerified = true;
  await model.create(rest);
};

const list = async ({ page, limit }) => {
  page = Number(page) || 1;
  limit = Number(limit) || 1;
  return await model
    .aggregate([
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
const getById = async (id) => {
  await model.findOne({ _id: id });
};

module.exports = { create, list, getById };
