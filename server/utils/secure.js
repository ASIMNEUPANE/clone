const { verifyJWT } = require("./jwt");
const userModel = require("../modules/users/model");

const compareRoles = (requiredRoles, userRoles) => {
  if (requiredRoles.length < 1) return true;
  return requiredRoles.every(role => userRoles.includes(role));
};


const secureAPI = (roles) => {
 
    return async (req, res, next) => {
      try {
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
    ;
  } catch (e) {
    next(e);
  }}
};
module.exports = secureAPI;
