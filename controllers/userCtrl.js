const passport = require('passport');
const User = require('../models/user');

exports.createUser = async (req, res) => {

    if(req.body.email === undefined || req.body.password === undefined || req.body.firstname === undefined || req.body.gender === undefined){
        return res.status(200).json({error: 'You cannot submit empty fields'});
    }

    if(req.body.email === '' || req.body.password === '' || req.body.firstname === '' || req.body.gender === ''){
        return res.status(200).json({error: 'You cannot submit empty fields'});
    }

/*
    firstname = req.body.firstname;
  lastname = req.body.lastname;
    phone = req.body.phone;
    gender = req.body.gender;
  
 birthday = req.body.birthday;

    const newUser = new User();

    newUser.firstname = req.body.firstname;
    newUser.lastname = req.body.lastname;
    newUser.phone = req.body.phone;
    newUser.gender = req.body.gender;
    newUser.birthday = req.body.birthday;

    const userData = await newUser.save();

    await User.update({
        'email': req.body.email
    }, {
        $push: {user: {
            user: userData.email
        }}
    });
*/



    passport.authenticate('local-signup', (err, user, info) => {
        if(err){
            return res.status(200).json({error: err});
        }

        if(info){
            return res.status(200).json({error: info});
        }

        return res.status(201).json({message: 'User successfully created', user: user});
    })(req, res);
}



exports.loginUser = (req, res, next) => {
    if(req.body.email === undefined || req.body.password === undefined){
        return res.status(200).json({error: 'You cannot submit empty fields'});
    }

    if(req.body.email === '' || req.body.password === ''){
        return res.status(200).json({error: 'You cannot submit empty fields'});
    }

    passport.authenticate('local-login', (err, user, info) => {
        if(err){
            return res.status(200).json({error: err});
        }

        if(info){
            return res.status(200).json({error: info});
        }

        return res.status(201).json({message: 'User login successful', user: user});
    })(req, res, next);
}

exports.homePage = async (req, res) => {
    const result = await User.findOne({'email': req.params.email}, {'password': 0})
                    .populate("stores.store");
                            

    return res.status(200).json({user: result});
}

exports.profileUser = async (req, res) => {
    return res.status(200).json({user: result});
}

exports.searchUser = async (req, res) => {
    const email = req.body.user;
    const regex = new RegExp(email, 'gi');
    const user = await User.find({"email": regex});

    if(user.length > 0){
        return res.status(200).json({message: "Search Results", results: user});
    } else {
        return res.status(200).json({message: "Search Results", results: []});
    }
}

exports.updateUser = async (req, res) => {
    console.log(req.body);

    await User.updateMany({
        '_id': req.body.userId,
    }, {
       
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        date: req.body.date,
        phone: req.body.phone,
        street: req.body.street,
        city: req.body.city,
        zipCode: req.body.zipCode,
        country: req.body.country, 
    
    });


    return res.status(200).json({message: 'User updated successfully'});
}

exports.updateAdminUser = async (req, res) => {
    console.log(req.body);

    await User.updateMany({
        '_id': req.body.userId,
    }, {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        gender: req.body.gender,
        phone: req.body.phone,
        street: req.body.street,
        city: req.body.city,
        zipCode: req.body.zipCode,
        country: req.body.country, 
    
    });


    return res.status(200).json({message: 'User updated successfully'});
}


exports.deleteUser = async (req, res) => {
    User.deleteOne({
        '_id': req.params.id
    }, function (err, user) {
        if (err) return res.send(err);
        res.json({ message: 'Account Deleted' });
    });
}

exports.getAllUsers = async (req, res) => {
    const results = await User.find({})

    return res.status(200).json({result: results});
}

/*

exports.updateUser = async (req, res) => {
    await User.update({
        '_id': req.body.user._id,
        'users.user': {$ne: req.body.user._id}
    }, {
        $push: {users: {
            user: req.body.user._id
        }}
    });

    await User.update({
        '_id': req.body.user._id,
    }, {
        firstname = firstname,
        lastname = lastname,
        date = date,
        address = address,
        city = city,
        country = country,
        zipCode = zipCode,
        admin = userId
    });

    return res.status(200).json({message: 'Role added successfully.'});
*/
    


