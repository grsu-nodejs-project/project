var http = require('http');

exports.search = function(link) {

	var options = getOptions(link);

	var result = '';

	http.request(options, function(response) {
		var body = '';

		response.setEncoding('utf8');
		response.on('data', function(data) {
			console.log('get data');
			body += data;
		});

		response.on('end', function(){
			console.log('end data');
			result = body;
		});
	});

}

function getOptions(link) {
	var hostname = link.split('/')[2];
	var url = link.split('/').slice(2).join('/');

	//console.log(url);

	var options = {
		host: hostname,
		port: '80',
		url: url,
		method: 'GET'
	};

	// for(var key in options) {
	// 	console.log(key + ' = ' + options[key]);
	// }

	return options;
}