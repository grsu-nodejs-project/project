//how I can start app this
var app = require('../app');
var request = require('supertest')('http://localhost:3000');
var assert = require('chai').assert;

describe('Questions routes test', function() {
  it('module app exist', function() {
    assert.isDefined(app, 'app module dosn\'t define in this scope');
  });
  it('get /questions', function(done) {
    request
    .get('/questions')
    .expect(200)
    .expect('Content-type', 'text/html; charset=utf-8')
    .end(function(err, res) {
      // why we return done(err) ???
      if (err) return done(err);
      done();
    });
  });
  it('post /questions', function(done) {
    request
    .post('/questions')
    .send({link: 'http://db.chgk.info/tour/turn13'})
    .expect(200)
    .expect('Content-type', 'text/html; charset=utf-8')
  	.end(function(err, res) {
    if (err) return done(err);
    done();
  	});
  });
});
