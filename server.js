//Création du serveur

//Appel du protocole http
const http = require('http');
const app =require('./app');

//Définition du port d'écoute
app.set ('port', process.env.PORT || 3000)
const server = http.createServer(app);


server.listen(process.env.PORT || 3000);