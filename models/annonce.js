// annonce.js dans le dossier models/

const mongoose = require('mongoose'); // Import de Mongoose

// Création d'un schéma de données Mongoose
const annonceSchema = new mongoose.Schema({
  img: { type: String, required: true },
  title: { type: String,  },
  smallTitle: { type: String,  },
  localisation: { type: String,  },
  price: { type: String,  },
  piece: { type: Number,  },
  surface: { type: String,  },
  link: { type: String, required: true },
  transaction: { type: String,  }
});

annonceSchema.index({ link: 1 }, { unique: true });

// Compilation du schéma dans un modèle et exportation
const Annonce = mongoose.model('Annonce', annonceSchema);
module.exports = Annonce;
