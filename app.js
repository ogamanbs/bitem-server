const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cors = require('cors');
const logger = require('morgan');
const createError = require('http-errors');
const app = express();

const db = require('./config/database-connection');

const homeRouter = require('./routes/homeRouter');
const userRouter = require('./routes/userRouter');
const productsRouter = require('./routes/productsRouter');

const cookieParser = require('cookie-parser');

app.use(logger('dev'));
app.set('view engine', 'ejs');
app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(cookieParser());

app.use('/', homeRouter);
app.use('/user', userRouter);
app.use('/products', productsRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = res.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;