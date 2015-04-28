var http = require('http')

var download = function(host, port, path, succeed_callback, fail_callback) { 
    var options = {
        host: host,
        port: port,
        path: path
    };

    http.get(options, function(res) {
        var body = ""
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function() {
            succeed_callback(body);
        });
    }).on('error', function(e) {
        fail_callback(e);
    });
}

module.exports.download = download;
