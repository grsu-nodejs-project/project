var http = require('http');
var util = require('util');
var EventEmitter = require('events');
var converter = require('./htmlToObjectConverter');

function Searcher() {
  EventEmitter.call(this);

  var context = this;

  var resultIsReady = function(body) {
    context.emit('find', body);
  };

  this.search = function(link) {
    var req = http.request(link, function(response) {
      var html = '';
      response.setEncoding('utf8');
      response.on('data', function(data) {
        html += data;
      });
      response.on('end', function() {
        converter.convertHtmlToObject(html, '.question', resultIsReady);
      });

      response.on('error', function(error) {
        console.log(error.stack);
      });
    });

    req.on('error', function(error) {
      console.log(error.stack);
    });
    req.end();
  };
}
util.inherits(Searcher, EventEmitter);

module.exports = Searcher;
