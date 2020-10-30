const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const { environment } = require('./config');
const indexRouter = require('./routes/index-router');

const app = express();

app.use(cors({ origin: true }));
app.use(helmet({ hsts: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));  

app.use(indexRouter);

/*************** Error Handlers ***************/

app.use((req, res, next) => {
  const err = new Error('The requested resource couldn\'t be found.');
  err.errors = ['The requested resource couldn\'t be found.'];
  err.status = 404;
  next(err);
});

app.use(function(err, _req, res, _next) {
  res.status(err.status || 500);
  if (err.status === 401) {
    res.set('WWW-Authenticate', 'Bearer');
  }
  const isProduction = environment === 'production';
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    error: JSON.parse(JSON.stringify(err)),
    stack: isProduction ? null : err.stack,
  });
});

/***********************************************/
module.exports = app;
