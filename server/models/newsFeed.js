var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;


var newsSchema = new Schema({
  createdUser : {
    type: String,
    required: true
  },
  topic : {
    type: String,
    required: true
  },
  description : {
    type: String,
    required: true
  },
  photoUrl : {
    type: String
  },
  dateEvent : {
    type: Date
  },
  createDate : {
    type: Date,
    default: Date.now
  }
});

exports.NewsFeed = mongoose.model('NewsFeed', newsSchema);
