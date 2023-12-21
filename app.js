const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');

require('dotenv').config();


const middlewares = require('./middlewares');
const app = express();

let cacheTime;
let data;

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    await main();
    res.send('Annonce.json a été mis à jour.');
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
