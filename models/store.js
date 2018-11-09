const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    storeName: {type: String},
    storeStreet: {type: String, default: ''},
    storeCode: {type: String, default: ''},
    storeCity: {type: String, default: ''},
    storeCountry: {type: String, default: ''},
    storeCategory: {type: String, default: ''},
    storeWebsite: {type: String, default: ''},
    storePhone: {type: String, default: ''},
    storeEmail: {type: String, default: ''},
    storeFacebook:{type: String, default: ''},
    storeActivation:{type: Boolean, default: 'false'},
    admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    imageId: {type: String, default: ''},
    imageVersion: {type: String, default: ''},
    storeCreated: {type: Date, default: Date.now},
    rating: [{
        user: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
        products: {type: Number, default: 0},
        services: {type: Number, default: 0},
        place: {type: Number, default: 0},
        review: {type: String, default: ''},
        userOverall: {type: Number, default: 0},
        reviewCreated: {type: Date, default: Date.now},
    }],
    totalStars: {type: Number, default: 0},
    ratingOverall: [Number],
    productsTotal: [Number],
    servicesTotal: [Number],
    placeTotal: [Number],
    employees: [{
        employee: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }]
});

module.exports = mongoose.model('Store', storeSchema);