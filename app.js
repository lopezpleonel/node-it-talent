const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-Width, Content-Type, Accept, Autorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'GET', 'DELETE');
        return res.status(200).json({});
    }
    next();
})

// routes
app.use('/destinatario', require('./api/routers/destinatario'));
app.use('/transferencia', require('./api/routers/transferencia'));
app.use('/user', require('./api/routers/user'));

app.use(express.static(path.join(__dirname,'dist/ripley')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/ripley/index.html'));
})

module.exports = app;