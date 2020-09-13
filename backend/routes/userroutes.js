const express = require('express');
let Order = require('../models/order');
let Product = require('../models/product');
let Review = require('../models/review');
let User = require('../models/user');

const routes = express.Router();

routes.get('/getcurrentuser', async (req, res) => {
    res.json({
        user : req.user,
        token : req.query.toke
    });
});

routes.route('/order').get(async (req, res) => {
    let order = await Order.find({ placedby : req.user.username });
    if(!order){
        res.status(409).send({ message : "Order not found"});
    } else {
        res.json(order);
    }
});

routes.route('/order/status').get(async (req, res) => {
    let order = await Package.find({ _id : req.query._id });
    if(!order){
        res.status(409).send({ message : "Order not found"});
    } else {
        res.json(order);
    }
});

routes.route('/order/place').post(async (req, res) => {
    let user = req.user;
    if(user.usertype == 'customer'){
        let product = await Product.findOne({name: req.body.name, soldby: req.body.soldby})
        if(!product){
            res.status(409).send({ message : "Order could not be placed because item does not exist!"});
        } else {
            if(product.stat === "cancelled"){
                res.status(400).send({ message : "cannot place order, cancelled by vendor!" })
            } else {
                let order = new Order({
                    ...req.body,
                });

                order.stat = product.stat
                let orders = await Order.find({soldby : user.username, name : req.body.name}, (err, ordert) => {
                    ordert.forEach((ord) => {
                        ord.stat = product.stat;
                        ord.save();
                    });
                });

                product.quantity += Number(req.body.quantity);

                try{
                    await product.save();
                    order.stat = product.stat;
                    await order.save();
                    let conditions = {soldby : user.username, name : req.body.name}
                    let update = {$set : {stat: product.stat}}
                    let options = {multi : true}
                    Order.update(conditions, update, options)

                } catch(error) {
                    console.log(error)
                    res.status(500).send({ message: "something went wrong :/" });
                };
                res.send({ message : "order placed successfully" });
            }
        }
    } else {
        res.status(400).send({ message : "user not a customer!" });
    }
});

routes.route('/order/edit').post(async (req, res) => {
    let user = req.user;
    if(user.usertype == 'customer'){
        let order = await Order.findOne({ name: req.body.name, placedby: user.username, soldby: req.body.soldby});
        if(!order){
            res.status(409).send({ message : "order not found" });
        }
        let product = await Product.findOne({ name: req.body.name, soldby: req.body.soldby });
        if(!product){
            res.status(409).send({ message : "order not found" });
        }

        if(order.stat == "dispatched"){
            res.status(409).send({ message: "order dispatched already, can't be edited"});
        }

        product.quantity -= Number(order.quantity);
        order.quantity = Number(req.body.quantity);
        product.quantity += Number(order.quantity);

        let orders = await Order.find({soldby : user.username, name : req.body.name}, (err, ordert) => {
            ordert.forEach((ord) => {
                ord.stat = product.stat;
                ord.save();
            });
        });

        try{
            product.save();
            order.stat = product.stat;
            order.save();
        } catch(error){
            console.log(error);
            res.status(500).send({ message: "something went wrong :/" });
        }
        res.send({ message : "order edited successfully" });
    } else {
        res.status(400).send({ message : "user not a customer" });
    }
});

routes.route('/product/create').post(async (req, res) => {
    let user = req.user;
    if(user.usertype == 'vendor'){
        let product = new Product({
            ...req.body,
        });
        
        try{
            product.save();
        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "something went wrong :/" });
        };
        res.send({ message : "product created successfully" });
    } else {
        res.status(400).send({ message : "user not a vendor!" });
    }
});

routes.route('/product/viewall').get(async (req, res) => {
    let user = req.user;
    if(user.usertype == 'vendor'){
        let products = await Product.find({ soldby : user.username });
        res.json(products);
    } else {
        res.status(400).send({ message : "user not a vendor!" });
    }
});

routes.route('/product/ready').get(async (req, res) => {
    let user = req.user;
    if(user.usertype == 'vendor'){
        let products = await Product.find({ soldby : user.username, stat : "ready" });
        res.json(products);
    } else {
        res.status(400).send({ message : "user not a vendor!" });
    }
});

routes.route('/product/cancel').post(async (req, res) => {
    let user = req.user;
    if(user.usertype == 'vendor'){
        let product = await Product.findOne({ soldby : user.username, name : req.body.name })
        let order = await Order.find({soldby : user.username, name : req.body.name}, (err, order) => {
            order.forEach((ord) => {
                ord.stat = "cancelled";
                ord.save();
            });
        });

        product.stat = "cancelled";
        try{
            product.save();
        } catch(error) {
            console.log(error)
            res.status(500).send({ message : "something went wrong :/" });
        }
        res.send({message: "cancelled"});
    } else {
        res.status(400).send({ message : "user not a vendor!" });
    }
});

routes.route('/product/dispatch').post(async (req, res) => {
    let user = req.user;
    if(user.usertype == 'vendor'){
        let product = await Product.findOne({ soldby : user.username, name : req.body.name })
        let order = await Order.find({soldby : user.username, name : req.body.name}, (err, order) => {
            order.forEach((ord) => {
                ord.stat = "dispatched";
                ord.save();
            });
        });

        product.stat = "dispatched";
        try{
            product.save();
        } catch(error) {
            console.log(error)
            res.status(500).send({ message : "something went wrong :/" });
        }
        res.send({message: "dispatched"});
    } else {
        res.status(400).send({ message : "user not a vendor!" });
    }
});


routes.route('/product/find').post(async (req, res) => {
    let user = req.user;
    if(user.usertype == 'customer'){
        let products = await Product.find({ name : req.body.name });
        res.json(products);
    } else {
        res.status(400).send({ message : "user not a customer!" });
    }
});

routes.route('/product/findone').post(async (req, res) => {
    let product = await Product.findOne({ name: req.body.name, soldby: req.body.soldby });
    if(!product){
        res.send(500).send({message : "something went wrong :/"});
    } else {
        res.json(product);
    }
});

module.exports = routes;
