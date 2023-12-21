const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');

require('dotenv').config();

const middlewares = require('./middlewares');
const { main } = require('./scrapping');

const app = express();
let cacheTime;
let data;

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/annonces', async (req, res) => {
    const filePath = './annonces.json';
    fs.readFile(filePath, 'utf-8', (err, fileData) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier:', err);
            return res.status(500).send('Erreur lors de la lecture du fichier');
        }

        try {
            data = JSON.parse(fileData);
        } catch (parseError) {
            console.error('Erreur lors de l\'analyse du JSON:', parseError);
            data = [];
        }

        cacheTime = Date.now();
        res.json(data);
    });
});

// Planification du scrapping toutes les 3 minutes
setInterval(() => {
    console.log('Lancement du scrapping à', new Date());
    main()
        .then(() => console.log('Scrapping terminé avec succès'))
        .catch((error) => console.error('Erreur lors du scrapping:', error));
}, 60000); // 180000 millisecondes correspondent à 3 minutes

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
