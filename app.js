const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');

require('dotenv').config();

// Assurez-vous d'importer la fonction main depuis le fichier de scrapping si nécessaire
// const { main } = require('./path-to-your-scrapping-module');

const middlewares = require('./middlewares');
const app = express();

let cacheTime;
let data;

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/annonces', async (req, res) => {
    // Vérifiez si les données sont en cache et toujours valides
    if (cacheTime && cacheTime > Date.now() - (1000 * 60 * 60)) { // 1 heure en millisecondes
        return res.json(data);
    }

    // Ajoutez ici votre logique de mise à jour des données
    // Par exemple : data = await main();

    // Mettez à jour le cacheTime après la mise à jour des données
    cacheTime = Date.now();
    data = ...; // Les données actualisées

    res.json(data);
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
