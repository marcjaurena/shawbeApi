const User = require('../models/user');
const Store = require('../models/store');

exports.createStore = async (req, res) => {

    if(req.body.storeName === undefined || req.body.storeCategory === undefined || req.body.storeEmail === undefined ||
        req.body.storeFirstname === undefined || req.body.storeLastname === undefined || req.body.storeCountry === undefined 
        || req.body.storeCity === undefined || req.body.storeStreet === undefined || req.body.storeCode === undefined ){
            return res.status(200).json({error: 'You cannot create company with empty fields'});
        }
    
    if(req.body.storeName === '' || req.body.storeCategory === '' || req.body.storeEmail === '' ||
        req.body.storeFirstname === '' || req.body.storeLastname === '' || req.body.storeCountry === '' || req.body.storeCity === '' 
        || req.body.storeStreet === '' || req.body.storeCode === ''){
            return res.status(200).json({error: 'You cannot create company with empty fields'});
    }

    const newStore = new Store();

    newStore.storeName= req.body.storeName;
    newStore.storeCategory = req.body.storeCategory;
    newStore.storeEmail = req.body.storeEmail;
    newStore.storeFirstname = req.body.storeFirstname;
    newStore.storeLastname = req.body.storeLastname;
    newStore.storeCountry = req.body.storeCountry;
    newStore.storeCity = req.body.storeCity;
    newStore.storeStreet = req.body.storeStreet;
    newStore.storeCode = req.body.storeCode;

    const storeData = await newStore.save();

    await Store.update({
        '_id': req.body.storeId
    }, {
        $push: {stores: {
            store: storeData._id
        }}
    });

    return res.status(200).json({message: 'Store created successfully'});
}

exports.updateStore = async (req, res) => {
    console.log(req.body);

    await Store.updateMany({
        '_id': req.body.storeId,
    }, {

    storeName: req.body.storeName,
      storeCategory: req.body.storeCategory,
      storeEmail: req.body.storeEmail,
      storeFirstname: req.body.storeFirstname,
      storeLastname: req.body.storeLastname,
      storeCountry: req.body.storeCountry,
      storeCity: req.body.storeCity,
      storeStreet: req.body.storeStreet,
      storeCode: req.body.storeCode
    
    });

    return res.status(200).json({message: 'Store updated successfully'});
}


exports.getAllStores = async (req, res) => {
    const results = await Store.find({})
                        .populate("rating.user")

    return res.status(200).json({result: results});
}

exports.search = async (req, res) => {
    const searchName = req.body.store;
    const regex = new RegExp(searchName, 'gi');
    const store = await Store.find({"storeName": regex});

    if(store.length > 0){
        return res.status(200).json({message: "Search Results", results: store});
    } else {
        return res.status(200).json({message: "Search Results", results: []});
    }
}


exports.addReview = async (req, res) => {

    if(req.body.products === '' || req.body.services === '' || req.body.place === '' 
    || req.body.review == '' || req.body.overall === ''){
        return res.status(200).json({error: 'No empty fields allowed'});
    }

    if(req.body.products === undefined || req.body.services === undefined || req.body.place === undefined 
    || req.body.review == undefined || req.body.overall === undefined){
        return res.status(200).json({error: 'No empty fields allowed'});
    }


    const store= await Store.update({
        "_id": req.body.storeId
    }, {
        $push : {rating: {
            user: req.body.userId,
            products: req.body.products,
            services: req.body.services,
            place: req.body.place,
            review: req.body.review,
            userOverall: req.body.overall

        },
            ratingOverall: req.body.overall,
            productsTotal: req.body.products,
            servicesTotal: req.body.services,
            placeTotal: req.body.place
        },
        $inc: {totalStars: req.body.overall}
    });

    return res.status(200).json({message: 'Review added successfully'});
}

exports.deleteStore = async (req, res) => {
    Store.deleteOne({
        '_id': req.params.id
    }, function (err, store) {
        if (err) return res.send(err);
        res.json({ message: 'Account Deleted' });
    });
}


exports.addEmployee = async (req, res) => {
    await Store.update({
        '_id': req.body.store._id,
        'employees.employee': {$ne: req.body.user._id}
    }, {
        $push: {employees: {
            employee: req.body.user._id
        }}
    });

    await User.update({
        '_id': req.body.user._id,
    }, {
        role: req.body.role
    });

    return res.status(200).json({message: 'Role added successfully.'});
}

