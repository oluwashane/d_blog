const Article = require('../models/article');

const postArticle = async (req, res) => {
  const article = new Article({
    ...req.body,
    // eslint-disable-next-line no-underscore-dangle
    user: req.user._id,
  });
  try {
    await article.save();
    res.status(201).send(article);
  } catch (e) {
    res.sendStatus(400);
  }
};

// eslint-disable-next-line consistent-return
const editArticle = async (req, res) => {
  const articleId = req.params.id;
  const currentArticle = await Article.findById(articleId);
  const acceptableUpdate = ['title', 'description'];
  const updates = Object.keys(req.body);
  const isValid = updates.every((update) => acceptableUpdate.includes(update));
  if (!isValid) {
    return res.status(400).send({ message: 'Invalid Update' });
  }
  try {
    updates.forEach((update) => {
      currentArticle[update] = req.body[update];
    });
    await currentArticle.save();
    res.status(200).send(currentArticle);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const articles = async (req, res) => {
  const data = await Article.find({});
  res.status(200).send(data);
};

// eslint-disable-next-line consistent-return
const deleteArticle = async (req, res) => {
  const article = await Article.findOneAndDelete({ _id: req.params.id });
  if (!article) {
    return res.status(400).send('bad request');
  }
  res.status(200).send(article);
};

module.exports = {
  postArticle,
  editArticle,
  articles,
  deleteArticle,
};
