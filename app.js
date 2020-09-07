//Appel du framework express
const express =require('express');
const app = express();
//Appel d'une instance de la base de données
const db =require('./config/database');

//Appeldu module des CORS qui permettent aux applications extérieures d'accéder à l'API
var cors = require('cors');
app.use(cors());

//Définition d'un l'emplacement ou seront stockés les images 
app.use(express.static('./public/img/'));

//Appel du fichier contenant les routes, nos endpoints
app.use('/products', require('./routes/routes.js'));


app.use((req,res) => {
    res.json({message : "Application lancée"})
})
module.exports = app;