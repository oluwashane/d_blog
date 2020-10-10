const express = require('express');
const { postArticle, editArticle, articles, deleteArticle } = require('../controllers/article');
const authorization = require('../middleware/auth');

const router = express.Router();

router.post('/article/post', authorization, postArticle);
router.patch('/article/edit/:id', authorization, editArticle);
router.get('/article', articles);
router.delete('/article/delete/:id', authorization, deleteArticle);

module.exports = router;
