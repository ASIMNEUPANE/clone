const { verifyJWT } = require("./jwt");
const userModel = require("../modules/users/model");

const compareRoles = (requiredRoles, userRoles) => {
  if (requiredRoles < 1) return true;
  return userRoles.some((v) => requiredRoles.indexOf(v) !== -1);
};

const secureAPI = (roles) => {
  try {
    return async (req, res, next) => {
      const token = req?.headers?.authorization;
      if (!token) throw new Error("Token required");
      const accessToken = token.split("Bearer ")[1];
      const { data } = verifyJWT(accessToken);
      const { email } = data;

      const user = await userModel.findOne({ email });
      if (!user) throw new Error("user not found");
      const validRoles = compareRoles(roles ?? [], user?.roles);
      if (!validRoles) throw new Error("user unathorized");
      next();
    };
  } catch (e) {
    next(e);
  }
};
module.exports = secureAPI
