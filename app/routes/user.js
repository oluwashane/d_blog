const express = require('express');
const authUser = require('../middleware/auth');
const { signup, login, logout, logoutAll, profile, users } = require('../controllers/user');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', authUser, logout);
router.post('/logoutAll', authUser, logoutAll);
router.get('/profile', authUser, profile);
router.get('/users', users);

module.exports = router;
