const express = require('express');
const router = express.Router();
var multer = require('multer');
const fileUpload = require('express-fileupload');
var bodyParser =require('body-parser');

const Service = require('../services/productService');
const Product = require('../models/product');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}))

var prodService = new Service();


router.use(fileUpload());
//Route to find all products
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

//Route to get product by name and by ean
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

//Route to post a product
router.post("/add", async (req, res, next) => {


    res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
    if(req.method === "OPTIONS"){

    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

    }
    next();
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

            Object.keys(image).forEach(function (prop) {
                var img= image[prop];
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

//Route to update a product
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