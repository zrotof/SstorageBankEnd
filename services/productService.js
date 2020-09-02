const Product = require('../models/product');


const db = require('../config/database');

class ProductService{

    contructor(){}


    //list products
    async listProducts(){

      
      //Product.find()
       return Product.deleteMany({});

    };


    //list product(s) found by Name and EAN code
    async listProductByNameEan(param){

      
      return Product.find({ name: param.name, ean: param.ean });
    }

    //Save a product
    async addProduct(product){

      console.log("Comming from front :",product);
          var  prod= Product({
            name: product.name,
            ean: product.ean,
            description: product.description,
            qty:product.qty,
            price:product.price,
            image:product.image
        })
        
        console.log("prod :",prod);
       return prod.save();
    }

  //Update a product quantity
  async updateProduct(product){

    return await Product.updateOne({ name: product.name, ean: product.ean }, { qty: product.qty }); 

  }
}
module.exports = ProductService ;