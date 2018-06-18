var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;


var newsSchema = new Schema({
  createdUser : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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
  latLng : {
    type: Object
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
