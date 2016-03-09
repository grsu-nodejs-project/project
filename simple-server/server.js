var http = require('http');
var qs = require('querystring');
var searcher = require('./searcher');

var memory = {};

var server = http.createServer(function(request, response) {

	if (request.url == '/questions' && request.method == 'POST') {
		response.writeHeader(200);

		var requestBody = '';

		request.on('data', function(data) {
			requestBody += data;
		});

		request.on('end', function() {
			var params = qs.parse(requestBody);

			var link = params.link;

			// How use this???
			//var data = searcher.search(link);

			var options = getOptions(link);

			if (!memory[link]) {
				searcher.searcher.search(options);
				searcher.searcher.on('find', function(responseBody) {
					response.writeHeader(200, { 'content-type' : 'text/html' });
					response.end(responseBody, 'utf8');
				});
			} else {
				response.writeHeader(200, { 'content-type' : 'text/html' });
				response.end(memory[link], 'utf8');
			}

		});

	} else {
		response.writeHeader(404, { 'content-type' : 'text/html'});
		response.end('page not found');
	}
});

server.listen(3000);

function getOptions(link) {
	return link;

	var hostname = link.split('/')[2];
	var url = link.split('/').slice(2).join('/');

	var options = {
		host: hostname,
		port: '80',
		// url: url - main page, why???
		path: url,
		method: 'GET'
	};

	console.log(options.path);

	return options;
}