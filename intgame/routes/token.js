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
  if (req.body.username == 'login' && req.body.password == 'ok') {
    res.send({access_token: 'some bs'});
  } else {
    res.status(400).send({error: 'invalid_grant'});
  }
});
module.exports = router;
