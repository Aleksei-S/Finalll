var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;


var messageSchema = new Schema({
  idUser : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  idNews : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NewsFeed',
    required: true
  },
  createDate : {
    type: Date,
    default: Date.now,
    required: true
  },
  message : {
    type: String,
    required: true
  }

});

exports.Message = mongoose.model('Message', messageSchema);