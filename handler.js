var crawler = require('./crawler');
var dao = require('./dao');
var config = require('./config');
module.exports = function() {
	function Handler() {
		this.type = 'convert';
	}

	Handler.prototype.work = function(payload, callback)
	{	
		var fail_attempt_count = 0;
		var succeed_attempt_count = 0;

		var attempt_func = function() {
			console.log(payload.from);
			console.log(payload.to);
			crawler.fetch_rate(payload.from, payload.to, function(rate) {
				console.log(rate);
				dao.save(payload.from, payload.to, rate.toString());
				if (++succeed_attempt_count <= config.succeed_retry_total) {
					console.log("count" + succeed_attempt_count.toString());
					setTimeout(attempt_func, config.succeed_retry_delay * 1000);	
				} else {
					console.log("completed");
					callback('success');
				} 
			}, function(err){
				console.log(err);
				if (++fail_attempt_count <= config.fail_retry_total) {
					console.log("count" + fail_attempt_count.toString());
					setTimeout(attempt_func, config.fail_retry_delay * 1000);	
				} else {
					callback('success');
				}
			});
		}
		attempt_func();
	};
	var handler = new Handler();
	return handler;
};
