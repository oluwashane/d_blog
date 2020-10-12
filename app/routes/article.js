const express = require('express');
const { postArticle, editArticle, articles, deleteArticle } = require('../controllers/article');
const authorization = require('../middleware/auth');

const router = express.Router();

router.post('/article', authorization, postArticle);
router.patch('/article/:id', authorization, editArticle);
router.get('/article', articles);
router.delete('/article/:id', authorization, deleteArticle);

module.exports = router;
