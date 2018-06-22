var mongoose = require('./mongoose');
var config = require('../config/keys');
var Message = require('../models/message').Message;
var User = require('../models/user').User;
var NewsFeed = require('../models/newsFeed').NewsFeed;


///////////////////// create Message ///////////////////////////
exports.createMessage = function (req, res ,next) {
  console.log('createMessage');
  console.log(req.decoded);
  console.log(req.body.message);
  console.log(req.body.idNews);

  let message = new Message({
   idUser : req.decoded.data._id,
   idNews : req.body.idNews,
   createDate :  new Date(),
   message : req.body.message
 });

  console.log(message);
  message.save(function (err) {
    if (err) {return res.status(400).json({success:false, message:'Error processing request '+err});}
    res.status(201).json({
      success:true,
      message:'message add a success!!'
    });
  });

};






// ///////////////////// get Messages ///////////////////////////
exports.getMessages = function (req, res ,next) {

  Message.find({idNews : req.query._idNews}).populate('idUser').exec(function (err, messages) {
   if (err) {return res.status(422).json({success:false, message:'Error processing request '+err});}

   res.status(201).json({
    success:true,
    data: messages,
    message:'getMessages a succese'
  });
 });

};


///////////////////// create Message ///////////////////////////
exports.deleteMessage = function (req, res ,next) {
  console.log('deleteMessage');

Message.deleteOne({_id : req.body.id}, function (err) {
  if (err) {return res.status(400).json({success:false, message:'Error processing request '+err});}
        res.status(201).json({
        success:true,
        message:'message delete a success!!'
        });
});

};




// Tank.updateOne({ size: 'large' }, { name: 'T-90' }, function(err, res) {
//   // Updated at most one doc, `res.modifiedCount` contains the number
//   // of docs that MongoDB updated
// });
