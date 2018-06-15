var mongoose = require('./mongoose');
var NewsFeed = require('../models/newsFeed').NewsFeed;
var config = require('../config/keys');



exports.createNews = function (req, res ,next) {
  console.log('createNews');

let newNews = new NewsFeed({
       createdUserId : req.decoded.data._id,
       createDate : new Date(),
       topicNews : req.body.photoUrl,
       photoUrl : req.body.photoUrl,
       dateTimeEvent : req.body.dateTimeEvent,
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
            message:'News create a success'
          });
        });
    }
  });
};

exports.getAllNews = function (req, res ,next) {
  NewsFeed.find({}).exec(function (err, news) {
    if (err) {return res.status(422).json({success:false, message:'Error processing request '+err});}
    console.log(news);
    res.status(201).json({
      success:true,
      data: news,
      message:'getAllNews a succese'
    });
  });
};












exports.deleteNews = function (req, res ,next) {
	NewsFeed.remove({_id:req.params.id},function (err) {
	if (err) {return res.status(422).json({success:false, message:'Error processing request '+err});}
		res.status(201).json({
			success:true,
			message:'News remove a succese'
		});
	});
};


exports.getnewsFeedDetails = function (req, res ,next) {
	// NewsFeed.find({_id:req.params.id}).exec(function (err, news) {
	// 	if (err) {return res.status(422).json({success:false, message:'Error processing request '+err});}
	// 	res.status(201).json({
	// 		success:true,
	// 		message:'News remove a succese'
	// 	});
	// });
};




