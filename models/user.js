const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    birthday: {type: String},
    phone: {type: String},
    street: {type: String},
    city: {type: String},
    country: {type: String},
    zipCode: {type: String},
    email: {type: String},
    gender: {type: String},
    password: {type: String},
    created: {type: Date, default: Date.now},
   // updated: {type: Date, default: Date.now},

    //stores: [{
    //    store: {type: mongoose.Schema.Types.ObjectId, ref: 'Store'}
    //}],
    imageId: {type: String, default: 'defaultPic.png'},
    imageVersion: {type: String, default: '1538512846'}

});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);

