var express = require('express');
var handlebars = require('handlebars');
var heredoc = require('heredoc');
var Searcher = require('../lib/httpPageSearcher');
var qs = require('querystring');
var mongoose = require('mongoose');
var TemplateReader = require('../lib/templateReader');
mongoose.connect('mongodb://localhost/intgame');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Questions = require('../lib/questionsSchema');
// where I should store this path???
var questionFormsPath = './handlebars/questionFormTemplate.html';
//var questionsPagePath = './handlebars/questionsPageTempalate.html';

var router = express.Router();

// how I can test this router use?
router.use(function(req, res, next) {
  var templateReader = new TemplateReader();
  templateReader.read(questionFormsPath);
  templateReader.on('end', function(template) {
    req.questionForms = template;
    next();
  });
});

// router.use(function(req, res, next) {
//   var templateReader = new TemplateReader();
//   templateReader.read(questionsPagePath);
//   templateReader.on('end', function(template) {
//     req.questionsPage = template;
//     next();
//   });
// });

router.get('/', function(req, res) {

  res.send(req.questionForms);
});

router.post('/', function(req, res, next) {
  var link = req.body.link;
  Questions.find({link: link}, function(err, questions) {
    if (questions.length == 0) {
      searcher = new Searcher();
      searcher.search(link);
      searcher.on('find', function(data) {
        req.data = data;
        saveQuestion(link, data);
        next();
      });
    } else {
      console.log(link + ' from database');
      req.data = questions[0].question;
      next();
    }
  });
});

router.post('/', function(req, res) {
  console.log(req.data);
  res.send(req.questionForms + JSON.stringify(req.data));
});

function saveQuestion(link, data) {
  var question = new Questions({link: link, question: data});
  question.save(function(error, question) {
          if (error) {
            return console.log(error.stack);
          }
        });
}

module.exports = router;
