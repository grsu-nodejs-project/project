var Searcher = require('../lib/httpPageSearcher');
var assert = require('chai').assert;

describe('module httpPageSearcher test', function() {
  it('module httpPageSearcher exist', function() {
    assert.isDefined(Searcher, 'Searcher is undefined');
  });
  it('Searcher return page', function(done) {
    var searcher = new Searcher();
    var link = 'http://db.chgk.info/tour/turn13';
    searcher.search(link);
    searcher.on('find', function(body) {
      assert.notEqual(body.length, 0);
      done();
    });
  });
});
