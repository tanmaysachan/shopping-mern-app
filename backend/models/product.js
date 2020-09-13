const mongoose = require('mongoose');
let Order = require('./order');

let Product = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number,
        default: 0
    },
    mintodispatch: {
        type: Number
    },
    stat:{
        type: String
    },
    soldby:{
        type: String
    },
    prodimg: {
        type: String
    }
});

Product.pre('save', async function(next) {
    if(this.quantity >= this.mintodispatch && this.stat != "ready" && this.stat != "cancelled" && this.stat != "dispatched"){
        this.stat = "ready";
    }
    next();
});


module.exports = mongoose.model('Product', Product);
