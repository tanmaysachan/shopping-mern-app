const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
	    required: true
    },
    usertype: {
        type: String,
	    required: true
    }
});

User.pre('save', async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

User.methods.validPassword = async function(password){
    const user = this;
    const cmp = await bcrypt.compare(password, user.password);
    return cmp;
}

module.exports = mongoose.model('User', User);
