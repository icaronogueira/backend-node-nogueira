const User = require('../models/user');
const Company = require('../models/company');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var cloudinary = require('cloudinary');

cloudinary.config({ 
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
      // cloud_name: 'nogcloud', 
      // api_key: '666776379245362', 
      // api_secret: 'lrfzR7N6qQHZKh1dj5QD_GnuRdI' 
});

exports.addImage = async ((req,res) => {
      cloudinary.uploader.upload(req.body.image, (result) => {
            const savedData = async(()=>{
                  if (req.body.image){
                        await (User.update({
                              '_id': req.body.user._id
                        }, {
                              "imageId": result.public_id,
                              "imageVersion": result.version
                        }));
                  }
            });
            savedData().then(result => {
                  return res.status(200).json({message: 'Profile image uploaded.'});
            });
      });
});

exports.addLogo = async ((req,res) => {
      cloudinary.uploader.upload(req.body.image, (result) => {
            const savedData = async(()=>{
                  if (req.body.image){
                        await (Company.update({
                              '_id': req.body.company
                        }, {
                              "imageId": result.public_id,
                              "imageVersion": result.version
                        }));
                  }
            });
            savedData().then(result => {
                  return res.status(200).json({message: 'Company logo uploaded.'});
            });
      });
});