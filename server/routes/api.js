var express = require('express');
var router = express.Router();
var user = require('../lib/user');
var newsFeed = require('../lib/newsFeed');
var message = require('../lib/message');

var passport = require('passport');
///////////passport-github
var jwt = require('jsonwebtoken');
////////////

router.get('/', function(req, res, next) {
	res.send('respond with a APIROUTER$$$$$');
});

// /////////// 	user
router.post('/signup', user.signup);
router.post('/login', user.login);

//////<<<<<<<<SOCIAL NET>>>>>>>///////   api/auth/
router.get('/auth/google', passport.authenticate('google',{
	scope:['profile']
}));

router.get('/auth/github', passport.authenticate('github',{
	scope:['profile']
}));

router.get('/auth/facebook', passport.authenticate('facebook',{
	scope: ['publish_actions']
}));

router.get('/auth/google/redirect', passport.authenticate('google'), user.loginWithSocialNetwork);
router.get('/auth/github/redirect', passport.authenticate('github'), user.loginWithSocialNetwork);
router.get('/auth/facebook/redirect', passport.authenticate('facebook'), user.loginWithSocialNetwork);


//////<<<<<<<<authenticate>>>>>>>/////// 
router.post('/getUser', user.authenticate, function(req, res, next) {
		return res.status(201).json({
			success : true,
			token : req.body.token,
			// user : req.session.passport.user
			user : req.decoded.data
		});

});



///////////   NEWS  ////////////////
router.post('/createNews', user.authenticate, newsFeed.createNews);
router.get('/getNews', newsFeed.getAllNews);
router.get('/getOneNews', newsFeed.getOneNews);



///////////   Message  ////////////////
router.post('/createMessage', user.authenticate, message.createMessage);
router.post('/deleteMessage', user.authenticate, message.deleteMessage);
router.post('/editMessage', user.authenticate, message.editMessage);
router.get('/getMessages', message.getMessages);





module.exports = router;

