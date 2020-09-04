const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    ean : { type: String , required: true },
    name : { type: String , required: true },
    description : { type: String , required: false },
    image : { type: Array  , required: false },
    price : { type: Number , required: false },
    qty: { type: Number , required: false}

});

module.exports = mongoose.model('Product', productSchema);