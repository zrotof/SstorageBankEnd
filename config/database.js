const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();


const db = mongoose.connect(process.env.DATABASE_URI,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = db;