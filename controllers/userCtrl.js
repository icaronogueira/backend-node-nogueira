const passport  = require('passport');
const validator = require("email-validator");
const User      = require('../models/user');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

exports.createUser = (req, res, next) => {

      if (req.body.fullname==undefined || req.body.email==undefined || req.body.password==undefined) {
            return res.status(200).json({error: "You cannot submit empty fields."});
      }

      if (req.body.fullname==='' || req.body.email==='' || req.body.password==='') {
            return res.status(200).json({error: "You cannot submit empty fields."});
      }

      if (!validator.validate(req.body.email)) {
            return res.status(200).json({error: "Email address not valid."});
      }

      passport.authenticate('local-signup', (err, user, info) => {
            if (err)  {return res.status(500).json({error: err});}
            if (info) {return res.status(200).json({error: info});}
            return res.status(201).json({message: 'User successfully created', user: user});
      })(req,res,next);
}

exports.loginUser = (req, res, next) => {

      if (req.body.email==undefined || req.body.password==undefined) {
            return res.status(200).json({error: "You cannot submit empty fields."});
      }

      if (req.body.email==='' || req.body.password==='') {
            return res.status(200).json({error: "You cannot submit empty fields."});
      }

      if (!validator.validate(req.body.email)) {
            return res.status(200).json({error: "Email address not valid."});
      }

      passport.authenticate('local-login', (err, user, info) => {
            if (err)  {return res.status(500).json({error: err});}
            if (info) {return res.status(200).json({error: info});}
            return res.status(201).json({message: 'User login successfull', user: user});
      })(req,res,next);
}

exports.homePage = async ((req, res) => {
     const result = await(User.findOne({'email': req.params.email}, {'password': 0})
                              .populate("companies.company"));

      return res.status(200).json({user: result});
});