const jwt = require("jsonwebtoken");

const generateJWT = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_DURATION }
  );
};

const verifyJWT =  (token) => {
  try {
    return  jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    throw new Error("Token is invalid");
  }
};

module.exports = { generateJWT, verifyJWT };
