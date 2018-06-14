var express = require('express');
var router = express.Router();
var user = require('../lib/user');
var newsFeed = require('../lib/newsFeed');

var passport = require('passport');
///////////passport-github
var jwt = require('jsonwebtoken');
////////////

router.get('/', function(req, res, next) {
	res.send('respond with a APIROUTER$$$$$');
});

// /////////// 	user
// router.post('/signup', user.signup);
// router.post('/login', user.login);
// router.post('/authenticate', user.authenticate);
// router.get('/user/:id', user.getUserDetails);
// router.put('/user/:id', user.updateUser);
// router.put('/password/:id', user.updateUserPassword);





// /////////// 	news
// router.post('/news', newsFeed.createNews);
// router.get('/news', newsFeed.getAllNews);
// router.get('/news/:id', newsFeed.getnewsFeedDetails);


//////<<<<<<<<SOCIAL NET>>>>>>>///////   api/auth/






// router.get('/auth/google', passport.authenticate('google',{
// 	scope:['profile']
// }));

router.get('/auth/github', passport.authenticate('github',{
	scope:['profile']
}));

// router.get('/auth/facebook', passport.authenticate('facebook',{
// 	scope: ['publish_actions']
// }));

// router.get('/auth/google/redirect', passport.authenticate('google'), user.loginWithGoogle);
router.get('/auth/github/redirect', passport.authenticate('github'), user.loginWithGitHub);
// router.get('/auth/facebook/redirect', passport.authenticate('facebook'), user.loginWithFacebook);


// router.post('/getUser', user.authenticate, function(req, res, next) {
// 		return res.status(201).json({
// 			success : true,
// 			token : req.body.token,
// 			// user : req.session.passport.user
// 			user : req.decoded.data
// 		});

// });








module.exports = router;

