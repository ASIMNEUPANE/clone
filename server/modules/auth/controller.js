const model = require("../auth/model");
const bcrypt = require("bcrypt");
const userModel = require("../users/model");
const { generateOTP, verifyOTP } = require("../../utils/otp");
const { generateJWT } = require("../../utils/jwt");
const {mailer} = require("../../services/mailer");

const register = async (payload) => {
  const { password, roles, ...rest } = payload;
  rest.password = await bcrypt.hash(password, +process.env.SALT_ROUND);
  const user = await userModel.create(rest);
  const token = generateOTP();
  await model.create({ email: user?.email, token });
  return await mailer(user?.email,token)
};

const verifyEmail = async (email, token) => {
  const auth = await model.findOne({ email });
  if (!auth) throw new Error("auth not found");

  const isValidToken = await verifyOTP(token);
  if (!isValidToken) throw new Error("invalid token");

  const emailValid = auth?.token === +token;
  if (!emailValid) throw new Error("token misMatch");

  await userModel.findOneAndUpdate(
    { email },
    { isEmailVerified: true, isActive: true },
    { new: true }
  );
  await model.deleteOne({ email });
  
};

const regenerate = async (email) => {
  const auth = await model.findOne({ email });
  if (!auth) throw new Error("User not found");
  const newToken = await generateOTP();
  console.log(newToken);
  await model.findOneAndUpdate({ email }, { token: newToken }, { new: true });
  await model.deleteOne({ email });
  
  return await mailer(email, newToken);

};

const login = async (email, password) => {
  console.log(email, password);
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) throw new Error("User not found");
  if (!user.isEmailVerified) throw new Error("email is not verified");
  if (!user.isActive)
    throw new Error("email is not active .Please contact admin");
  const isValidPW = await bcrypt.compare(password, user?.password);
  if (!isValidPW) throw new Error("User name or password is invalid");
  const payload = {
    id: user?._id,
    email: user?.email,
    roles: user?.roles || [],
  };
  const token = await generateJWT(payload);
  return {
    // user: { name: user.name, role: user.roles, email: user.email },
    token,
  };
};
const generateFPToken = async (email) => {
  
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) throw new Error("user doesnot found");
  if (!user?.isActive) throw new Error("user has not been activate at..");
  if (!user?.isEmailVerified)
    throw new Error("user has not been verified at..");
  const token = generateOTP();
  await model.create({email, token});
 return mailer(email,token)
};

const forgetPassword = async (email, token, password) => {
  const user = await model.findOne({
    email,
  });
  if (!user) throw new Error("user doesnot exit");
  const isValidToken = await verifyOTP(token);
  if (isValidToken) throw new Error("Token expire");
  await userModel.findOneAndUpdate(
    { email },
    { password: await bcrypt.hash(password, +process.env.SALT_ROUND) },

    { new: true }
  );
  await model.deleteOne({ email });
};

module.exports = {
  register,
  verifyEmail,
  regenerate,
  login,
  generateFPToken,
  forgetPassword,
};
