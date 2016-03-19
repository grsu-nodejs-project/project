var http = require('http');
var util = require('util');
var EventEmitter = require('events');
	var env = require('jsdom').env;

function getItemsByClass(html, className, callback) {
	console.log(callback);
	var body = "";
	env(html, function(errors, window) {
		var $ = require('jquery')(window);
		var result = $(className).each(function() {
			body += $(this).html();
		});
		callback(body);
	});
};

function Searcher() {
	EventEmitter.call(this);

	var context = this;

	resultIsReady = function(body) {
		context.emit('find', body);
	}

	this.search = function(link) {
		var req = http.request(link, function(response) {
			var html = '';
			response.setEncoding('utf8');
			response.on('data', function(data) {
				html += data;
			});
			response.on('end', function() {
				console.log(resultIsReady);
				getItemsByClass(html, '.question', resultIsReady);
			});

			response.on('error', function(error) {
				console.log(error.stack);
			});
		});

		req.on('error', function(error) {
			console.log(error.stack);
		});
		req.end();
	}
}
util.inherits(Searcher, EventEmitter);

module.exports = Searcher;