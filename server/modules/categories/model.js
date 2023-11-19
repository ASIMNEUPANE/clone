const { Schema, model } = require("mongoose");
const {commonSchema}= require('../../utils/commomSchema')
const categorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String, maxlength: 100, minlength: 1 },
...commonSchema,
});

module.exports = model("Category", categorySchema);
