const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { ValidationError } = require('sequelize');
const { environment } = require('./config');
const indexRouter = require('./routes/index');

const app = express();

app.use(cors({ origin: true }));
app.use(helmet({ hsts: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(indexRouter);

app.use((req, res, next) => {
  const err = new Error("the requested resource couldn't be found.");
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Sequelize Error';
  }
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === 'production';
  res.json({title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
