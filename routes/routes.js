//Appel du framework express
const express = require('express');
//Appel du module qui nous permet de définir nos route
const router = express.Router();

//Appel du module express-fileupload qui permet de gérer l'upload de fichiers
const fileUpload = require('express-fileupload');

//Appel du module body-parser qui permet de gérer les objet de type json 
var bodyParser =require('body-parser');

const Service = require('../services/productService');
const Product = require('../models/product');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}))

//Appel du service
var prodService = new Service();

router.use(fileUpload());



//Endpoint qui renvoit la liste des produits en BDD
router.get("/", async (req, res) => {

    await prodService.listProducts()
    .then(data=>{
        res.send(data);
    })
    .catch(err => {
         res.send({
             message : "Some error occurred while retrieving products."
         });
     });;;
});

//Endpoint qui permet d'effectuer une recherche en dans le request un objet qui contient le nom et lean du produit
router.get("/product/:name&:ean", async (req, res) => {


    //console.log("get name:");
   // console.log("get body:",req.params.name);

  

    await prodService.listProductByNameEan({name: req.params.name, ean: req.params.ean})
    .then(data =>{
        res.send(data);
        
    })
    .catch( err =>
        res.send({
           message:"Oops, quelque chose n'a pas marché, veuillez vérifier les champs"
        })
    );
    
});

//Endpoint qui permet d'ajouter un nouveau produit
router.post("/add", async (req, res, next) => {

    var product = req.body;
    var fileName ='';
    console.log("req.body :", req.body.name);
   console.log("req.files.image  taille:", req.files);

   var paths = [];
   var image =[];
  
    if(req.files === null){

        fileName = 'default.jpg';

    }
    else{

        
         image = req.files.images;

            images.forEach((img) => {
                console.log(img);
            });

            console.log("File img: ",img.name);
            fileName = Date.now()+(img.name.split(" ").join(""));
            paths.push("https://sstoragebackend.herokuapp.com/"+fileName);

            
          /*  img.mv('./public/img/'+fileName, function(err){
                if(err){
                    return res.send(err);
                }
            });*/

        
        }
        
    


    //console.log("fileName:", paths);
  /*
    await prodService.addProduct({ name: product.name, 
                                    ean: product.ean, 
                                    price: product.price, 
                                    qty: product.qty, 
                                    description: product.description, 
                                    image: paths})
    .then(data =>{
        res.send(data),
        console.log("ok save");
    })
    .catch(err =>{
        res.send(
            message = err || "Some error occurred while creating the Tutorial."),
          
          console.log("error :",message);
    });*/

});

//Endpoint qui permet de moqifier la qauntité en stock
router.put("/modify", async (req, res) => {
    var product = req.body;
    console.log("req.body update :", req.body);


    await prodService.updateProduct(product)
    .then(data =>{
        res.send(data),
        console.log("ok save");
    })
    .catch(err =>{
        res.send(
        message = err || "Some error occurred while creating the Tutorial."),
        console.log("error :",message);
    });
})
module.exports = router ;