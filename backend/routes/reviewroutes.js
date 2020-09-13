const express = require('express');
let Order = require('../models/order');
let Product = require('../models/product');
let Review = require('../models/review');
let User = require('../models/user');

const routes = express.Router();

routes.route('/add').get(async (req, res) => {
    let review = new Review({...req.body});
    try{
        review.save();
        res.send({ message : "review saved successfully" });
    } catch(error) {
        console.log(error);
        res.status(500).send({ message : "something happened :/" });
    }
});

module.exports = routes;
