const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose'); // Ajoutez Mongoose

require('dotenv').config();

const middlewares = require('./middlewares');
const { main } = require('./scrapping');

const Annonce = require('./models/annonce'); // Assurez-vous que le chemin est correct

const app = express();

// Configuration et connexion à MongoDB avec Mongoose
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { serverSelectionTimeoutMS: 120000 })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/annonces', async (req, res) => {
    try {
        // Récupérer toutes les annonces via Mongoose
        const annoncesList = await Annonce.find({});
        
        res.json(annoncesList);
    } catch (e) {
        console.error('Erreur lors de la récupération des annonces:', e);
        res.status(500).send('Erreur lors de la récupération des annonces');
    }
});

// Planification du scrapping toutes les 3 minutes
// Planification du scrapping toutes les 3 minutes
// Votre logique pour appeler main à intervalles réguliers
setInterval(() => {
    console.log('Lancement du scrapping à', new Date());
    main().catch(error => {
        console.error('Erreur lors du scrapping:', error);
    });
}, 18000000); // toutes les 5 heures

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
