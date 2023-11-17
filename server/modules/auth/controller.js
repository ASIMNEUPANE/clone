const model = require("../auth/model");
const bcrypt = require("bcrypt");
const userModel = require("../users/model");
const { generateOTP } = require("../../utils/otp");

const register = async (payload) => {
  const { password, roles, ...rest } = payload;
  rest.password = await bcrypt.hash(password, +process.env.SALT_ROUND);
  const user = await userModel.create(rest);
  const token = generateOTP();
  await model.create({email:user?.email, token});
};

module.exports = { register };
