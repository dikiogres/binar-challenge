const express = require('express');
const app = express(); 
const morgan = require('morgan');
const router = require('./router');

app.set('view engine', 'ejs');
app.use(morgan('dev'));

app.listen(3000);

app.use(router);
