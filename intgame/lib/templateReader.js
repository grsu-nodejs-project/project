var fs = require('fs');
var util = require('util');
var EventEmitter = require('events');

var TemplateReader = function() {
  EventEmitter.call(this);
  var context = this;
  this.read = function(path) {
    fs.readFile(path, 'utf-8', function(err, data) {
    if (err) {
      throw err;
    }
    context.emit('end', data);
  });
  };
};
util.inherits(TemplateReader, EventEmitter);

module.exports = TemplateReader;
