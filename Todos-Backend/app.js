const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const todosRouter = require('./routes/todos');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/api/auth', authRouter);
app.use('/api/todos', todosRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    payload: "What you were looking for was not found. The endpoint or method is unhandled by the Server",
    err: true
  })
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    payload: {
      err: err,
      errStack: err.stack
    },
    err: true
  });
});

module.exports = app;
