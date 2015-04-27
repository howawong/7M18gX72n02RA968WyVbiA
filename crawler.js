var downloader = require('./downloader');
var cheerio = require('cheerio');
function _fetch_rate(from, to, succeed_callback, fail_callback) {
	downloader.download("www.xe.com", 80, '/currencyconverter/convert/?Amount=1&From=' + from + '&To=' + to, function(body){
		$ = cheerio.load(body);
    	$('td.leftCol').each(function(i, element){
      	var a = $(this);
      	var txt = a.text();
	  	if (txt.indexOf("=") != -1) {
			rate = parseFloat(txt.split("=")[1].trim().split(" ")[0]);
			succeed_callback(rate);
	  	}
		});
	}, fail_callback);
}

module.exports = {
	fetch_rate: function(from, to, succeed_callback, fail_callback) {
		return _fetch_rate(from, to, succeed_callback, fail_callback);	
	},
}
