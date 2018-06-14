var mongoose = require('./mongoose');
// var User = require('../models/user').User;
// var jwt = require('jsonwebtoken');
// var passportJWT = require('passport-jwt');
// var config = require('../config/keys');

exports.signup = function (req, res ,next) {
	// var username = req.body.username;
	// var password = req.body.password;

	// if (!username || !password) {
	// 	return res.status(403).json({success:false, message:'posted data is not correct or incomplete'});
	// }

	// User.findOne({username:username}, function (err, existingUser) {
	// 	if (err) {return res.status(422).json({success:false, message:'Error processing request '+err});}

	// 	if (existingUser) {
	// 		return res.status(201).json({success:false, message:'User already exist '+err});
	// 	}

	// 	let createUser = new User({
	// 		username:username,
	// 		password:password
	// 	});

	// 	createUser.save(function (err, createUser) {
	// 		if (err) {return res.status(400).json({success:false, message:'Error processing request '+err});}
	// 		res.status(201).json({
	// 			success:true,
	// 			message:'User create a succese'
	// 		});
	// 	});
	// });
};
