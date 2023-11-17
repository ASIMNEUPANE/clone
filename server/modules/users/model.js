const { Schema, model } = require("mongoose");



const userSchema = new Schema({
  name: { type: String, requires: "Full name is required" },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",

   
  },
  isEmailVerified: { type: Boolean, default: false },

  password: { type: String, default: false, select: false },
  roles: {
    type: Array,
    default: ["user"],
    required: true,
  },
  image:{type:String},

  isActive: { type: Boolean, default: false },
});

module.exports = model("User", userSchema);
