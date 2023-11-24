const model = require("./model");
const bcrypt = require("bcrypt");

const create = async (payload) => {
  const { password, roles, ...rest } = payload;
  rest.password = await bcrypt.hash(password, +process.env.SALT_ROUND);
  rest.isActive = true;
  rest.isEmailVerified = true;
  return await model.create(rest);
};

const list = async ({ page, limit, search }) => {
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 3;
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
    let {data,total}= newData;
     total = total || 0;
    return {data,limit,total,page}
};
const getById = async (id) => {
  return await model.findOne({ _id: id });
};
const updateById = async (id, payload) => {
  return await model.findOneAndUpdate({ _id: id }, payload, { new: true });
};

const changePassword = async (id, oldPassword, newPassword) => {
  const user = await model.findOne({ _id: id }).select("+password");
  if (!user) throw new Error("user not found");
  if (!user?.isActive || !user?.isEmailVerified)
    throw new Error("user is not active or verified yet..");
  const checkPass = await bcrypt.compare(oldPassword, user?.password);
  if (!checkPass) throw new Error("old password didnot match");
  const newPass = await bcrypt.hash(newPassword, +process.env.SALT_ROUND);
  return await model.findOneAndUpdate(
    { _id: user?.id },
    { password: newPass },
    { new: true }
  );
};

const resetPassword = async (id, password) => {
  const user = await model.findOne({ _id: id });
  if (!user) throw new Error("User not found");
  const newPass = await bcrypt.hash(password, +process.env.SALT_ROUND);
  return await model.findOneAndUpdate(
    { _id: id },
    { password: newPass },
    { new: true }
  );
};

const block = async (id, payload) => {
  const user = await model.findOne({ _id: id });
  if (!user) throw new Error("User not found");
  return await model.findOneAndUpdate({ _id: id }, payload, { new: true });
};
const archived = async (id, payload) => {
  const user = await model.findOne({ _id: id });
  if (!user) throw new Error("User not found");
  return await model.findOneAndUpdate({ _id: id }, payload, { new: true });
};

module.exports = {
  create,
  list,
  getById,
  updateById,
  changePassword,
  resetPassword,
  block,
  archived,
};
