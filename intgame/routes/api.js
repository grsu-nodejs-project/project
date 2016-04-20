'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/intgame');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var model = require('../lib/dbModel');

router.get('/games', function(req, res, next) {
  let promise = new Promise(function(resolve, reject) {
    let questions = new model.Games;
    model.Games.find({}, function(err, games) {
      if (err) {
        reject(err);
      }
      resolve(games);
    });
  });
  promise
        .then(result => {
          console.log(result);
          res.type('json');
          res.send(JSON.stringify(result));
        })
        .catch(error => {
          return console.log(error.stack);
        });
});

module.exports = router;