var mongoose = require('../lib/mongoose');
// var bcypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username : {
    type: String
  },
  password : {
    type: String
  },
  socialNetworkId : {
    type: String
  },
  photoUrl : {
    type: String
  },
    lastlogin : {
    type: Date
  },
  created : {
    type: Date,
    default: Date.now
  }
});




///schema.methods.



exports.User = mongoose.model('User', UserSchema);
