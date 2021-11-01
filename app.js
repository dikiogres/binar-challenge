const express = require('express');
const app = express(); 
const morgan = require('morgan');
const router = require('./router');
const port = 3000;

app.set('view engine', 'ejs');

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
}

app.use(logger);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(router);

app.use(function(err, req, res, next) {
    console.error(err)
    res.status(500).json({
        status: 'fail',
        errors: err.message
    })
})

app.use((req, res, next) => {
    res.status(404).json({
        status: 'fail',
        errors: 'Page not found'
    })
    next();
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
