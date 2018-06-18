var mongoose = require('./mongoose');
var User = require('../models/user').User;
var jwt = require('jsonwebtoken');
// var passportJWT = require('passport-jwt');
var config = require('../config/keys');

// exports.signup = function (req, res ,next) {
// 	var username = req.body.username;
// 	var password = req.body.password;

// 	if (!username || !password) {
// 		return res.status(403).json({success:false, message:'posted data is not correct or incomplete'});
// 	}

// 	User.findOne({username:username}, function (err, existingUser) {
// 		if (err) {return res.status(422).json({success:false, message:'Error processing request '+err});}

// 		if (existingUser) {
// 			return res.status(201).json({success:false, message:'User already exist '+err});
// 		}

// 		let createUser = new User({
// 			username:username,
// 			password:password
// 		});

// 		createUser.save(function (err, createUser) {
// 			if (err) {return res.status(400).json({success:false, message:'Error processing request '+err});}
// 			res.status(201).json({
// 				success:true,
// 				message:'User create a succese'
// 			});
// 		});
// 	});
// };


// exports.login = function (req, res, next) {
// 	console.log('req.body.username' + req.body.username);
// 	console.log('req.body.password' + req.body.password);
// 	User.findOne({username : req.body.username }, function (err, user) {
// 		if (err) { res.status(400).json({success:false, message:'Error processing request '+err});}

// 		if (!user) {
// 			return res.status(201).json({success:false, message:'Incorect login credentials '});
// 		} else if (user) {
// //passwprd crypt

// //update last date visit
// user.lastlogin = new Date();

// let jwtUser = {
// 	id : user.id,
// 	displayName : user.displayName,
// 	photo : user.photo,
// 	lastlogin : user.lastlogin
// };
// var token = jwt.sign(
// 	{data : jwtUser},
// 	config.token.secretJWT, {
// 		expiresIn: config.token.exp
// 	}
// 	);

// user.save(function (err) {
// 	if (err) { res.status(400).json({succes:false, message:'Error processing request '+err});}
// 	res.status(201).json({
// 		success:true,
// 		message:{'userId': user._id, 'username': user.username, 'photo': user.photo, 'lastlogin': user.lastlogin},
// 		token: token
// 	});
// });

// } else {
// 	return res.status(201).json({success:false, message:'Incorect login credentials '});
// }
// });
// };




exports.loginWithSocialNetwork = function (req, res, next) {

console.log(req.user.provider);
console.log(req.user.id);
console.log(req.user);
let socialNetwork = req.user.provider + 'Id_';
  User.findOne({socialNetworkId : socialNetwork + req.user.id}, function (err, user) {
    if (err) { return res.status(400).json({success:false, message:'Error processing request '+err});}
    if (user) {
      //update last date visit
      console.log(socialNetwork );
      user.lastlogin = new Date();
      user.save(function (err) {
        if (err) { res.status(400).json({succes:false, message:'Error processing request '+err});}
        let token = jwt.sign({data : user}, config.token.secretJWT, {
          expiresIn: config.token.exp
        });
        res.redirect("/login/?token=" + token);
      });
    } else {
      console.log('NOT LOGIN!!!!' );
      let createUser = new User({
        username : req.user.username || req.user.displayName,
        socialNetworkId : socialNetwork + req.user.id,
        photoUrl : req.user.photos[0].value,
        lastlogin : new Date()
      });
      createUser.save(function (err, user) {
        if (err) { res.status(400).json({succes:false, message:'Error processing request! on save '+err});}
        let token = jwt.sign({data : user}, config.token.secretJWT, {
          expiresIn: config.token.exp
        });
        res.redirect("/login/?token=" + token);
      });
    }
  });
};



exports.authenticate = function (req, res, next) {
  console.log(  req.user);
  // console.log(  req.body);

	let token = req.headers['authorization'] || req.body.token;
	console.log('authorization');
  // console.log(  req.headers);

	// console.log(req.body);
	// console.log(token);
	if (token) {
		jwt.verify(token, config.token.secretJWT, function (err, decoded) {
			if (err) {
				return res.status(201).json({success:false, message:'Auth token expired please login again '})
			} else {
				req.decoded = decoded;
				console.log('next');
				next();
			}
		});
	} else {
		return res.status(201).json({
			success:false,
			message:'fatal error, Auth token not available!!!&&',
			errcode: 'no-token'
		});
	}
}









// exports.getUserDetails = function (req, res, next) {
// 	User.find({_id:req.params.id}).exec(function (err, user) {
// 		if (err) {
// 			res.status(400).json({success:false, message:'Error request '+err});
// 		}
// 		res.status(201).json({
// 			success:true,
// 			data:user
// 		});
// 	});
// }

// exports.updateUser = function (req, res, next) {
// 	console.log('update user');
// }

// exports.updateUserPassword = function (req, res, next) {
// 	console.log('update user Password');
// 	let userId = req.params.id;
// 	let oldPassword = req.body.oldPassword;
// 	let password = req.body.password;


// 	if (!oldpassword || !password || !userId) {
// 		return res.status(422).json({success:false, message:'Posted data not correct'});
// 	} else {
// 		User.findOne({_id : userId},function (err, user) {
// 			if (err) {return res.status(400).json({succes:false, message:'Error processing request '+err});}
// 			if (user) {
// // statement
// } else {
// // statement
// }
// });
// 	}




// }
