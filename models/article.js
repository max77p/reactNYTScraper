const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  snippet: { type: String, required: true,index:{unique:true,dropDups:true}},
  link: { type: String, required: true },
  pubdate: { type: String, required: false },
  author: { type: String, required: false }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
