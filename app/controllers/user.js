const User = require('../models/user');

const signup = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    console.log(token);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send('Bad Request');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findCredentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const logout = async (req, res) => {
  try {
    const { user } = req;
    user.tokens = user.tokens.filter((token) => (token.token !== req.token));
    await req.user.save();
    res.status(200).send({ message: 'we hope to see you again' });
  } catch (e) {
    res.sendStatus(400);
  }
};

const logoutAll = async (req, res) => {
  try {
    const { user } = req;
    user.tokens = [];
    await user.save();
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(400);
  }
};

const profile = (req, res) => {
  res.send(req.user);
};

const users = async (req, res) => {
  const user = await User.find({});
  res.send(user);
};

module.exports = {
  signup,
  login,
  logout,
  logoutAll,
  profile,
  users,
};
