const User = require('../models/user');
const Store = require('../models/store');
const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'process.env.CLOUD_NAME', 
    api_key: 'process.env.API_KEY', 
    api_secret: 'process.env.API_SECRET' 
/*   cloud_name: 'rateapp57', 
    api_key: '983967233415999', 
    api_secret: '1I3oAJ-jw6RrUJ6uczK2KnT-Wdw' */
  });

  
  exports.addImage = async (req, res) => {
    cloudinary.uploader.upload(req.body.image, (result) => {
        const savedData = async () => {
            if(req.body.image){
                await User.update({
                    '_id': req.body.user._id
                }, {
                    "imageId": result.public_id,
                    "imageVersion": result.version
                });
            }
        }

        savedData()
            .then(result => {
                return res.status(200).json({message: 'Profile image uploaded'});
            })
    });
}

exports.addLogo = async (req, res) => {
    cloudinary.uploader.upload(req.body.image, (result) => {
        const savedData = async () => {
            if(req.body.image){
                await Store.update({
                    '_id': req.body.company
                }, {
                    "imageId": result.public_id,
                    "imageVersion": result.version
                });
            }
        }

        savedData()
            .then(result => {
                return res.status(200).json({message: 'Company logo uploaded'});
            })
    });
}