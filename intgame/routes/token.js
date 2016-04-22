'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var model = require('../lib/dbModel');

router.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

router.post('/', function(req, res, next) {
  let Users = model.Users;
  let login = req.body.username;
  let password = req.body.password;
  console.log(`${login} ${password}`);
  Users.findOne({login: login, password: password})
  .then(doc => {
    console.log(doc);
    if (doc != null && doc != undefined) {
      res.send({access_token: doc.token});
    } else {
      res.status(400).send({error: 'invalid_grant'});
    }
  })
  .catch(err => {
    res.status(400).send({error: 'error in database'});
  });
  //if (req.body.username == 'login' && req.body.password == 'ok') {
  //  res.send({access_token: 'some bs'});
  //} else {
  //  res.status(400).send({error: 'invalid_grant'});
  //}
});
module.exports = router;
