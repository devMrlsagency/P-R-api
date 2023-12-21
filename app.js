const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');
const path = require('path'); // Ajout du module 'path'

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
    // if (cacheTime && cacheTime > Date.now() - (1000 * 30)) {
    //     return res.json(data);
    // }

    const filePath = './annonces.json';
    console.log("Répertoire de travail actuel:", process.cwd()); // Afficher le répertoire de travail actuel
    console.log("Chemin complet du fichier:", path.join(process.cwd(), filePath)); // Afficher le chemin complet du fichier

    fs.readFile(filePath, 'utf-8', (err, fileData) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier:', err);
            return res.status(500).send('Erreur lors de la lecture du fichier: ' + err.message);
        }

        try {
            data = JSON.parse(fileData);
        } catch (parseError) {
            console.error('Erreur lors de l\'analyse du JSON:', parseError);
            // Vous pouvez choisir de renvoyer une réponse vide ou un message d'erreur
            data = [];  
        }

        cacheTime = Date.now();
        res.json(data);
    });
});


app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
