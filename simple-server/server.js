var http = require('http');
var qs = require('querystring');
//var searcher = require('./searcher');

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
				http.request(options, function(queryResponse) {
					var html = '';

					queryResponse.setEncoding('utf8');
					queryResponse.on('data', function(data) {
						html += data;
					});

					queryResponse.on('end', function(){
						response.writeHeader(200, { 'content-type' : 'text/html' });

						var env = require('jsdom').env;
						env(html, function(errors, window) {
							console.log(errors);

						// Doen't work
						//var result = window.document.getElementsByClassName('Question');

						var $ = require('jquery')(window);
						var result = $('.question');

						var responseBody = '';

						for(var i = 0; i < result.length; ++i) {
							responseBody += result[i].outerHTML;
						}
						
						memory[link] = responseBody;

						response.end(responseBody, 'utf8');
					});
					});
				}).end();
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