const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  link: {type: String,required: true}
});

const article = mongoose.model("article", articleSchema);

module.exports = article;
