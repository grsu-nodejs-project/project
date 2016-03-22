var http = require('http');
var util = require('util');
var EventEmitter = require('events');
var env = require('jsdom').env;
var cheerio = require('cheerio');

function getItemsByClass(html, className, next, callback) {
  var body = '';
  env(html, function(errors, window) {
    var $ = require('jquery')(window);
    var result = $(className).each(function() {
      body += $(this).html();
    });
    callback(body);
  });
};

function convertHtmlToObject(html, className, callback) {
  var $ = cheerio.load(html);
  var resultArray = [];
  var needFindClass = ['Question', 'Answer', 'PassCriteria', 'Comments', 'Sources'];
  var cnt = 0;
  $(className).each(function() {
    var obj = new Object();
    var context = this;
    needFindClass.forEach(function(value) {
      var text = $(context).find($('.' + value)).parent().text();
      obj[value.toLowerCase()] = text.trim();
    });
    var image = $(context).find('img').attr('src');
    if (image) {
      obj.image = image;
    }
    resultArray.push(obj);
  });
  callback(resultArray);
};

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
        convertHtmlToObject(html, '.question', resultIsReady);
        //getItemsByClass(html, '.question', convertHtmlToObject ,resultIsReady);
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
