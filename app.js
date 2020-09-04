const express =require('express');
const app = express();

const db =require('./config/database');

app.use((req, res, next) => {

  
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
    if(req.method === "OPTIONS"){

    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

    }
    next();
  });

app.use(express.static('./public/img/'));
app.use('/products', require('./routes/routes.js'));


app.use((req,res) => {
    res.json({message : "Application lancée"})
})
module.exports = app;