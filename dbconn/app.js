const express = require('express');
const app = express();
const indexRouter = require('./api/routes/index');
const userRouter = require('./api/routes/user');
const loginRouter = require('./api/routes/login');
const postRouter = require('./api/routes/post');
const bodyParser = require('body-parser');
const conn = require('./dbconnect');


app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/post', postRouter);


module.exports = app;