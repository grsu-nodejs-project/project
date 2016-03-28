var request = require('supertest')('http://localhost:3000');
var assert = require('chai').assert;

describe('Questions routes test', function() {
  it('get /questions', function(done) {
    request
    .get('/questions')
    .expect(200)
    .expect('Content-type', 'text/html; charset=utf-8')
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      done();
    });
  });
  it('post /questions', function(done) {
    request
    .post('/questions')
    .send({link: 'http://db.chgk.info/tour/turn13'})
    .expect(200)
    .expect('Content-type', 'application/json; charset=utf-8')
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});
