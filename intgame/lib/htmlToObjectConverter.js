var cheerio = require('cheerio');

var convertHtmlToObject = function(html, className, callback) {
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

exports.convertHtmlToObject = convertHtmlToObject;