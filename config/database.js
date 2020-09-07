//Ce code permet de se connecter à la base de donnée distante mongoose 


const mongoose = require('mongoose');

//Accès au fichier .env 
const dotenv = require('dotenv');
dotenv.config();

//Initianlisation de la connection en fournissant l'uri renseigné dans le fichier .env
const db = mongoose.connect(process.env.DATABASE_URI,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
      //En cas de succès pou d'erreur on renvoit un message associé
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = db;