const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let Product = require('./models/product');
let Order = require('./models/order');
let Review = require('./models/review');

app.use(cors());
//app.use(bodyParser.json());
app.use( bodyParser.urlencoded({ extended : false }) );
app.use(passport.initialize());
require('./auth');

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

const secureroutes = require('./routes/userroutes');
const orderroutes = require('./routes/orderroutes');
const productroutes = require('./routes/productroutes');

app.use('/user', passport.authenticate('jwt', {session : false}), secureroutes);
app.use('/orders', passport.authenticate('jwt', {session : false}), orderroutes);
app.use('/products', passport.authenticate('jwt', {session : false}), productroutes);

userRoutes.route('/getallusers').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

/*
userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});
*/

userRoutes.post('/signup', passport.authenticate('signup', { session : false }) , (req, res, next) => {
    res.json({
      message : 'Signup successful',
      user : req.body.username
    });
});

userRoutes.post('/login', function(req, res, next){
    passport.authenticate('login', async (err, user, info) => {     
        try {
            if(err){
                const error = new Error('An Error occurred')
                return next(error);
            }
            if(!user){
                const error = new Error('Wrong username or password!');
                return next(error);
            }
            req.login(user, { session : false }, async (error) => {
                if( error ) return next(error)

                const body = { _id : user._id, username : user.username, usertype : user.usertype };

                const token = jwt.sign({ user : body },'key');

                return res.json({ username: user.username, usertype: user.usertype, token });
            });     
        } 
        catch (error) {
            return next(error);
        }
    })(req, res, next);
});

userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
