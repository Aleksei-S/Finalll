var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;


var newsSchema = new Schema({
  createdUserId : {
    type: String,
    required: true
  },
  createDate : {
    type: Date,
    default: Date.now,
    required: true
  },
  topicNews : {
    type: String,
    required: true
  },
  photoUrl : {
    type: String
  },
  dateTimeEvent : {
    type: Date
  },
  adress : {
    type: String,
    required: true
  },
  place_id : {
    type: String,
    required: true
  },
  description : {
    type: String
  }

});

exports.NewsFeed = mongoose.model('NewsFeed', newsSchema);
