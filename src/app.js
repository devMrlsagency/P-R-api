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

app.get('/annonces', async (req, res) => {
    if (cacheTime && cacheTime > Date.now() - (1000 * 30)) {
        return res.json(data);
    }

    const filePath = './annonces.json';
    fs.readFile(filePath, 'utf-8', (err, fileData) => {
        if (err) {
            return res.status(500).send('Erreur lors de la lecture du fichier');
        } else {
            data = JSON.parse(fileData);
            cacheTime = Date.now();
            res.json(data);
        }
    });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
