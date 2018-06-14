var mongoose = require('mongoose');
var keys = require('../config/keys');

mongoose.connect(keys.mongodb.mlab, function (err) {
		if (err) {
				console.log('Eror conect to mongoose');
		} else {
				console.log('Connect succses to db');
		}
});

module.exports = mongoose;
