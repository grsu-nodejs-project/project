var assert = require('chai').assert;
var TemplateReader = require('../lib/templateReader');
describe('Template reader test', function() {
  it('Read template', function(done) {
    var templateReader = new TemplateReader();
    // how can I use relative path, if I wish execute this test with different pwd()
    var path = './handlebars/questionFormTemplate.html';
    templateReader.read(path);
    templateReader.on('end', function(data) {
      assert.notEqual(data.length, 0);
      done();
    });
  });
});
