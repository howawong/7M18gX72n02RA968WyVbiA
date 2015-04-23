var http = require('http')

function _download(host, port, path, callback_func) { 
	var options = {
  		host: host,
  		port: port,
  		path: path
	};

	http.get(options, function(res) {
  		console.log("Got response: " + res.statusCode);
  		var body = ""
  		res.on('data', function (chunk) {
			body += chunk;
  		});
  		res.on('end', function() {
			callback_func(body);
  		});
	}).on('error', function(e) {
  		console.log("Got error: " + e.message);
	});
}

module.exports = {
	download: function(host, port, path, callback) {
		return _download(host, port, path, callback);	
	},
}
