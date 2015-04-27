var config = require('./config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Save Function
//Example Use: save("USD", "HKD", 0.13);
mongoose.model('Currency', new Schema({from: String, to: String, created_at: {type:Date, default:Date.now}, rate: String}))
db = mongoose.createConnection(config.dbconnection());
function _save(from, to, rate) {
	var Currency = db.model('Currency');
	var record = new Currency({from: from, to: to, rate: rate})
	record.save(
		function(err) {
			if (err) { console.log(err); throw err};
			console.log("Saved");
		}
	);
}


process.on('SIGINT', function() {
  mongoose.connection.close(function () {
      console.log('Mongoose disconnected on app termination');
	      process.exit(0);
	});
});

module.exports = {
	save: function(from, to, rate) {
		return _save(from, to, rate);	
	},
}
