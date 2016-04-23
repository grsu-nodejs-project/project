var cheerio = require('cheerio');

var convertHtmlToObject = function(html, className, callback) {
  var $ = cheerio.load(html);
  var resultArray = [];
  var needFindClass = ['Question', 'Answer', 'PassCriteria', 'Comments', 'Sources'];
  var cnt = 0;
  $(className).each(function() {
    var obj = new Object();
    var context = this;
    needFindClass.forEach(function(value, index) {
      var text = $(context).find($('.' + value)).parent().text();
      if (index === 1) {
        text = processAnswer(text);
      }
      obj[value.toLowerCase()] = text.trim();
    });
    var image = $(context).find('img').attr('src');
    if (image) {
      obj.image = image;
    } else {
      obj.image = '';
    }
    resultArray.push(obj);
  });
  callback(resultArray);
};

function processAnswer(answer) {
  answer = answer.trim().substr(6);
  return answer;
}

exports.convertHtmlToObject = convertHtmlToObject;
