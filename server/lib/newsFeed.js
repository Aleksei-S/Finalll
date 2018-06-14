var mongoose = require('./mongoose');
var NewsFeed = require('../models/newsFeed').NewsFeed;
var config = require('../config/keys');


//function
//saveNews - save news or update


exports.createNews = function (req, res ,next) {
	let userId = req.body.id;
	let topic = req.body.topic;
	let description = req.body.description;
	let photoUrl = req.body.photoUrl;
	let createDate = req.body.createDate;
	let dateEvent = req.body.dateEvent;
	if (!userId || !topic || !description) {
			return res.status(422).json({success:false, message:'posted data is not correct or incomplete'});
		} else {
			// add new
			let newNews = new NewsFeed({
			createdUser : userId,
			topic : topic,
			description : description,
			photoUrl : photoUrl,
			createDate :createDate,
			dateEvent : dateEvent,
			});
		newNews.save(function (err) {
			if (err) {return res.status(400).json({success:false, message:'Error processing request '+err});}
			res.status(201).json({
				success:true,
				message:'News create a succese'
			});
		});
	}
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

exports.getAllNews = function (req, res ,next) {
	NewsFeed.find({}).exec(function (err, news) {
		if (err) {return res.status(422).json({success:false, message:'Error processing request '+err});}
		console.log(news);
		res.status(201).json({
			success:true,
			message:'getAllNews a succese'
		});
	});
};


