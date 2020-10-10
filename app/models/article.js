const { Schema, model } = require('mongoose');

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    tolowercase: true,
  },
  description: {
    type: String,
    required: true,
    tolowercase: true,
  },
  content: {
    type: String,
    required: true,
    tolowercase: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const Article = model('Blog', ArticleSchema);
module.exports = Article;
