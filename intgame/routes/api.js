'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var model = require('../lib/dbModel');
var Searcher = require('../lib/httpPageSearcher');

router.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, PATCH');
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
      return;
    }
    let responseJSON = {game: result};
    res.send(responseJSON);
  }))
  .catch((err) => {
    res.status(400).send({error: 'database error'});
  });
});

router.get('/profiles', function(req, res, next) {
  let profile = {profiles: req.user};
  res.status(200).send(profile);
});

router.put('/profiles/:id', function(req, res, next) {
  let profile = req.body.profile;
  let User = model.Users;
  console.log(profile);
  User.findOneAndUpdate({token: req.user.token}, profile)
  .then(() => {
    console.log('ok');
    res.status(200).send({ok: 'ok'});
  })
  .catch((err) => {
    res.status(404).send({err: 'error with database'});
  });
});

router.post('/games', function(req, res, next) {
  let link = req.body.game.link;
  let name = req.body.game.name;
  let questionTime = req.body.game.questionTime;
  let searcher = new Searcher();
  searcher.search(link);
  searcher.on('find', function(result) {
    let Game = model.Games;
    let game = new Game({
      name: name,
      link: link,
      questionTime: questionTime,
      questions: result
    });
    game.save()
    .then((result) => {
      res.status(200).send({ok: 'ok'});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
  });
});

router.delete('/games/:id', function(req, res, next) {
  res.send({ok: 'ok'});
});

module.exports = router;
