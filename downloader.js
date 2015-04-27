var http = require('http')

function _download(host, port, path, succeed_callback, fail_callback) { 
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
			succeed_callback(body);
  		});
	}).on('error', function(e) {
  		console.log("Got error: " + e.message);
		fail_callback(e);
	});
}

module.exports = {
	download: function(host, port, path, succeed_callback, fail_callback) {
		return _download(host, port, path, succeed_callback, fail_callback);	
	},
}
