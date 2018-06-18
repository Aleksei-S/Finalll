var mongoose = require('./mongoose');
var NewsFeed = require('../models/newsFeed').NewsFeed;
var config = require('../config/keys');
var User = require('../models/user').User;



///////////////////// getAllNews ///////////////////////////
exports.getAllNews = function (req, res ,next) {
  NewsFeed.find({}).populate('createdUser').exec(function (err, news) {
    if (err) {return res.status(422).json({success:false, message:'Error processing request '+err});}
    console.log(news);
    res.status(201).json({
      success:true,
      data: news,
      message:'getAllNews a succese'
    });
  });
};


///////////////////// getOneNews ///////////////////////////
exports.getOneNews = function (req, res ,next) {

  console.log(req.query._id)

  NewsFeed.findOne({_id : req.query._id})
  .exec(function (err, news) {
    if (err) {return res.status(422).json({success:false, message:'Error processing request '+err});}
    console.log(news);
    res.status(201).json({
      success:true,
      data: news,
      message:'getOneNews a succese'
    });
  });
};

///////////////////// createNews ///////////////////////////
exports.createNews = function (req, res ,next) {
console.log('createNews');
console.log(req.decoded);
console.log(req.body);

let newNews = new NewsFeed({
       createdUser:req.decoded.data._id,
       createDate : new Date(),
       topicNews : req.body.topicNews,
       photoUrl : req.body.photoUrl,
       dateTimeEvent : req.body.dateTimeEvent,
       latLng: req.body.latLng,
       adress : req.body.adress,
       place_id : req.body.place_id,
       description : req.body.description
     });

  NewsFeed.findOne({createdUserId : req.decoded.data._id, dateTimeEvent : req.body.dateTimeEvent, place_id: req.body.place_id}, function (err, news) {
    if (err) { return res.status(400).json({success:false, message:'Error processing request '+err});}
    if (news) {
      //update last date visit
          console.log("ESTb TAKAI ZE EVENT" );
          res.status(201).json({
            success: false,
            message:'This news already exist'
          });
    } else {
        newNews.save(function (err) {
          if (err) {return res.status(400).json({success:false, message:'Error processing request '+err});}
          res.status(201).json({
            success:true,
            message:'News create a success!!'
          });
        });
    }
  });
};







// exports.getAllNews = function (req, res ,next) {
//   NewsFeed.find({}).exec(function (err, news) {
//     if (err) {return res.status(422).json({success:false, message:'Error processing request '+err});}
//     console.log(news);



//     // res.status(201).json({
//     //   success:true,
//     //   data: news,
//     //   message:'getAllNews a succese'
//     // });
//   });
// };












// exports.deleteNews = function (req, res ,next) {
// 	NewsFeed.remove({_id:req.params.id},function (err) {
// 	if (err) {return res.status(422).json({success:false, message:'Error processing request '+err});}
// 		res.status(201).json({
// 			success:true,
// 			message:'News remove a succese'
// 		});
// 	});
// };





