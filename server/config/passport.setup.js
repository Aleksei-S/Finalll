var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
// var TokenFacebookStrategy = require('passport-facebook-token');
var FacebookStrategy = require('passport-facebook').Strategy;
var GitHubStrategy = require('passport-github').Strategy;


var User = require('../models/user').User;
var keys = require('./keys');

passport.serializeUser(function(user, done) {
    // console.log(user);
    // done(null, user._id);
    // console.log("Serializer : ", user);
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    // user.findById(id, function(err, user) {
    //     done(err, user);
    // });
     // console.log("deserializeUser : ", user);
	done(null,user);

});

passport.use(new GoogleStrategy({
	clientID: keys.google.clientID,
	clientSecret: keys.google.clientSecret,
	callbackURL: "/api/auth/google/redirect"
},
	function(accessToken, refreshToken, profile, done) {
	return done(null, profile);
	}
));


passport.use(new FacebookStrategy({
	clientID: keys.facebook.clientID,
	clientSecret: keys.facebook.clientSecret,
	callbackURL: "http://localhost:3000/api/auth/facebook/redirect",
	 profileFields: ['id', 'displayName', 'picture.type(large)']
},
	function(accessToken, refreshToken, profile, done) {
		return done(null, profile);
	}
));


passport.use(new GitHubStrategy({
    clientID:  keys.github.clientID,
    clientSecret:  keys.github.clientSecret,
    callbackURL: "/api/auth/github/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
		return done(null, profile);
  }
));



