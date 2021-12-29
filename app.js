const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

const URL = '/api/v1';
const app = express();

dotenv.config();

// middleware
const notFoundMiddleware = require('./app/middlewares/not-found');
const errorHandlerMiddleware = require('./app/middlewares/error-handler');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_, res) => {
  res.json({ message: 'Welcome to api ' });
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
