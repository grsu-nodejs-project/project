var http = require('http');
var util = require('util');
var EventEmitter = require('events');

function Searcher() {
	EventEmitter.call(this);
}
util.inherits(Searcher, EventEmitter);
searcher = new Searcher();

searcher.search = function(link) {

	var body = '';

	http.request(link, function(queryResponse) {
					console.log('1\n');
					var html = '';
					queryResponse.setEncoding('utf8');
					queryResponse.on('data', function(data) {
						html += data;
					});

					queryResponse.on('end', function(){

						var env = require('jsdom').env;
						env(html, function(errors, window) {

						var $ = require('jquery')(window);
						var result = $('.question');

						for(var i = 0; i < result.length; ++i) {
							body += result[i].outerHTML;
						}

						searcher.emit('find', body);
					});
					});
				}).end();

}

module.exports.searcher = searcher;