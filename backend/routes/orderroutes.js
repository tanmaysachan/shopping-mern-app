const express = require('express');
let Order = require('../models/order');
let Product = require('../models/product');
let Review = require('../models/review');
let User = require('../models/user');

const routes = express.Router();

routes.route('/').get(async (req, res) => {
    Order.find(function(err, send){
        if(err){
            console.log(err);
            res.status(500).send({message:"something happened :/"});
        } else {
            res.json(send);
        }
    });

});

module.exports = routes;
