var crawler = require('./crawler');
var dao = require('./dao');
module.exports = function() {
	function Handler() {
		this.type = 'convert';
	}
	Handler.prototype.work = function(payload, callback)
	{
		console.log("working");
		console.log(payload.from);
		console.log(payload.to);
		callback('success');
		crawler.fetch_rate(payload.from, payload.to, function(rate) {console.log(rate);dao.save(payload.from, payload.to, rate.toString())}, function(err){console.log(err);});
	};
	var handler = new Handler();
	return handler;
};
