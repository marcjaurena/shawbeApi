const passport = require('passport');
const Retailer = require('../models/retailer');
const Store = require('../models/store');


exports.createRetailer = async (req, res) => {

    console.log(req.body);
 /*
     
    if( req.body.retailerFirstName === undefined || req.body.retailerLastName === undefined 
        || req.body.retailerEmail === undefined ||  req.body.retailerPhone === undefined ){
        return res.status(200).json({error: 'You cannot submit empty fields'});
    }

    if( req.body.retailerFirstName === '' || req.body.retailerLastName === '' 
        || req.body.retailerEmail === '' ||  req.body.retailerPhone === '' ){
        return res.status(200).json({error: 'You cannot submit empty fields'});
    }
*/
 
    
    const newRetailer = new Retailer();

    newRetailer.retailerFirstName= req.body.retailerFirstName;
    newRetailer.retailerLastName = req.body.retailerLastName;
    newRetailer.retailerEmail = req.body.retailerEmail;
    newRetailer.retailerPhone = req.body.retailerPhone;
    newRetailer.storeId = req.body.storeId;
   
    newRetailer.save();


   
    
    /*
    const storeDataRetailer = await newRetailer.save();

    await Retailer.update({
        '_id': req.body.storeId
    }, {
        $push: {stores: {
            store: storeDataRetailer._id
        }}
    });
  /*
    const retailer= await Retailer.update({
        "_id": req.body.storeId
    }, {
        $push: {retailers: {
            storeId: req.body.storeDataRetailer._id
        }}
    });

    return res.status(200).json({message: 'Store created successfully'});
    
    passport.authenticate('local-signup', (err, user, info) => {
        if(err){
            return res.status(200).json({error: err});
        }

        if(info){
            return res.status(200).json({error: info});
        }

        return res.status(201).json({message: 'Retailer successfully created', user: user});
    })
    */
   return res.status(200).json({message: 'Retailer successfully created'});
}

exports.searchRetailer = async (req, res) => {
    const retailerEmail = req.body.retailer;
    const regex = new RegExp(retailerEmail, 'gi');
    const retailer = await Retailer.find({"retailerEmail": regex});

    if(retailer.length > 0){
        return res.status(200).json({message: "Search Results", results: retailer});
    } else {
        return res.status(200).json({message: "Search Results", results: []});
    }
}

exports.getAllRetailers = async (req, res) => {
    const results = await Retailer.find({})

    return res.status(200).json({result: results});
}

exports.updateAdminRetailer = async (req, res) => {
    console.log(req.body);

    await Retailer.updateMany({
        '_id': req.body.retailerId,
    }, {
        retailerFirstName: req.body.retailerFirstName,
        retailerLastName: req.body.retailerLastName,
        retailerEmail: req.body.retailerEmail,
        retailerPhone: req.body.retailerPhone,
        retailerActivation: req.body.retailerActivation,
    });


    return res.status(200).json({message: 'Retailer updated successfully'});
}


exports.deleteRetailer = async (req, res) => {
    Retailer.deleteOne({
        '_id': req.params.id
    }, function (err, retailer) {
        if (err) return res.send(err);
        res.json({ message: 'Account Deleted' });
    });
}