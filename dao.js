var config = require('./config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Save Function
//Example Use: save("USD", "HKD", 0.13);
function _save(from, to, rate) {
	db = mongoose.createConnection(config.dbconnection());
	mongoose.model('Currency', new Schema({from: String, to: String, created_at: {type:Date, default:Date.now}, rate: Number}))
	var Currency = db.model('Currency');
	var record = new Currency({from: from, to: to, rate: rate})
	record.save(
		function(err) {
			if (err) throw err;
			console.log("Saved");
			console.log("Closing Connection");
			mongoose.disconnect();
			console.log("Closed");
		}
	);
}

module.exports = {
	save: function(from, to, rate) {
		return _save(from, to, rate);	
	},
}
