const express = require('express');
require('dotenv').config();
require('../db/mongoose');
const cors = require('cors');
const morgan = require('morgan');
const userRoute = require('./routes/user');
const articleRoute = require('./routes/article');
const { handleError, ErrorHandler } = require('./helper/error');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// setting up routers
app.use('/api/v1/', userRoute);
app.use('/api/v1/', articleRoute);

// catch all route
app.use((req, res, next) => {
  const error = new ErrorHandler(404, 'Page Not Found');
  next(error);
});

app.use((err, req, res, next) => {
  handleError(err, res);
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
