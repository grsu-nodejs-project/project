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
  if (req.method === 'OPTIONS') {
    console.log('OPTIONS');
    res.status(200).send();
    return;
  }
  let User = model.Users;
  let token = req.header('authorization').split(' ')[1];

  User.findOne({token: token})
  .then(doc => {
    if (doc == null) {
      res.status(401).send('Unauthorized');
    } else {
      req.user = doc;
      next();
    }
  })
  .catch(err => {
    res.status(400).send('Error with database');
  });
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

router.get('/games/:id', function(req, res, next) {
  let id = req.params.id;
  let Games = model.Games;
  Games.findOne({_id: id})
  .then((result => {
    if (result == null) {
      res.status(404).send({error: 'resource not found'});
    }
    let responseJSON = {game: result};
    res.send(responseJSON);
  }))
  .catch((err) => {
    res.status(400).send({error: 'database error'});
  });
});

module.exports = router;
