'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var model = require('../lib/dbModel');

router.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  console.log(req.header('authorization'));
  if (req.header('authorization') !== 'Bearer some bs' && req.method !== 'OPTIONS') {
    return res.status(401).send('Unauthorized');
  }
  next();
});

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
          //console.log(result);
          res.type('json');
          res.send(JSON.stringify({games: result}));
        })
        .catch(error => {
          return console.log(error.stack);
        });
});

module.exports = router;
