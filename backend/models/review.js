const mongoose = require('mongoose');

let Review = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    name: {
        type: String
    },
    vendor: {
        type: String
    },
    rating:{
        type: Number
    },
    product: {
        type: String
    },
    body: {
        type: String
    }
});

module.exports = mongoose.model('Review', Review);
