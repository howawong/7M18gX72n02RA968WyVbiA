var downloader = require('./downloader');
var cheerio = require('cheerio');
var fetch_rate = function(from, to, succeed_callback, fail_callback) {
	downloader.download("www.xe.com", 80, '/currencyconverter/convert/?Amount=1&From=' + from + '&To=' + to, function(body){
		$ = cheerio.load(body);
		var rate = Infinity;
    	$('td.leftCol').each(function(i, element){
      	var a = $(this);
      	var txt = a.text();
	  	if (txt.indexOf("=") != -1) {
			var fields = txt.split("=")
			if (fields.length == 2) {
				var rhs = fields[1].trim().split(" ")
				if (rhs.length > 0) {
					rate = parseFloat(rhs[0]);
				}
			}
	  	}
		});
		if (rate != Infinity && rate > 0.0) {
			succeed_callback(rate);
		} else {
			fail_callback(new Error("Unable to parse rate"));
		}
	}, fail_callback);
}

module.exports.fetch_rate = fetch_rate;
