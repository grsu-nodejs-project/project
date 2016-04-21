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
  let login = req.body.username;
  let password = req.body.password;
  console.log(login + ' ' + password);
  let user = new model.Users({login: login, password: password});
  user.save().then((result) => {
    console.log('save user');
    res.status(200).send({ok: 'ok'});
  })
  .catch((err) => {
    console.log(`errors in users save ${err}`);
    res.status(400).send({error: 'error with save'});
  });
});

module.exports = router;
