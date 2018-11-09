const mongoose = require('mongoose');

const retailerSchema = mongoose.Schema({
    retailerFirstName: {type: String, default: ''},
    retailerLastName: {type: String, default: ''},
    retailerEmail: {type: String, default: ''},
    retailerPhone: {type: String, default: ''},
    storeId: {type: String},
    retailerCreated: {type: Date, default: Date.now},
    retailerActivation: {type: String, default: false},

   /*
    stores: [{
      storeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Store'}
    }],

    country: {type: String},
    email: {type: String},
    password: {type: String},

    
    imageId: {type: String, default: 'defaultPic.png'},
    imageVersion: {type: String, default: '1538512846'}
    */

});

/*
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}$
*/

module.exports = mongoose.model('Retailer', retailerSchema);

