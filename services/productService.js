// Ce fichier contient les opérations


//Appel du modèle
const Product = require('../models/product');

//Appel d'une instance de la base de données
const db = require('../config/database');

class ProductService{

    contructor(){}


    //functions qui listent les  produits en BDD
    async listProducts(){

      
      //Product.deleteMany({})
       return Product.find();

    };


    //Renvoit un produit trouvé en BDD avec le nom et le code comme paramètre
    async listProductByNameEan(param){

      
      return Product.find({ name: param.name, ean: param.ean });
    }

    //Ajout d'un nouveau produit
    async addProduct(product){

   //   console.log("Comming from front :",product);
          var  prod= Product({
            name: product.name,
            ean: product.ean,
            description: product.description,
            qty:product.qty,
            price:product.price,
            image:product.image
        })
        
//        console.log("prod :",prod);
       return await prod.save();
    }

  //Update a product quantity
  async updateProduct(product){

    return await Product.updateOne({ name: product.name, ean: product.ean }, { qty: product.qty }); 

  }
}
module.exports = ProductService ;