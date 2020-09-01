const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    ean : { type: String , required: false },
    name : { type: String , required: false },
    description : { type: String , required: false },
    image : { type: String  , required: false },
    price : { type: Number , required: false },
    qty: { type: Number , required: false}

});

module.exports = mongoose.model('Product', productSchema);