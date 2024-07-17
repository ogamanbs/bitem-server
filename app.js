const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./config/mongoose-connection');

const userRouter = require('./routes/userRouter');
const ownerRouter = require('./routes/ownerRouter');
const productsRouter = require('./routes/productsRouter');

const path = require('path');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/owner', ownerRouter);
app.use('/user', userRouter);
app.use('/products', productsRouter);

app.listen(8000, () => {
    console.log(' / running... ');
});