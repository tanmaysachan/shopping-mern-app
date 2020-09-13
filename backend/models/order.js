const mongoose = require('mongoose');

let Order = new mongoose.Schema({
    name: {
        type: String
    },
    placedby: {
        type: String
    },
    soldby:{
        type: String
    },
    quantity: {
        type: Number
    },
    stat: {
        type: String
    }
});

module.exports = mongoose.model('Order', Order);
