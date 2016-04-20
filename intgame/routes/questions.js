var express = require('express');
var handlebars = require('handlebars');
var heredoc = require('heredoc');
var Searcher = require('../lib/httpPageSearcher');
//var db = require('mongoose').connection;
var TemplateReader = require('../lib/templateReader');
var Questions = require('../lib/questionsSchema');

var questionFormsPath = './handlebars/questionFormTemplate.html';
var questionViewPath = './handlebars/questionView.html';
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

router.get('/', function(req, res) {
  res.send(req.questionForms);
});

router.post('/', function(req, res, next) {
  var link = req.body.link;
  console.log(link);
  searcher = new Searcher();
  searcher.search(link);
  searcher.on('find', function(data) {
    req.data = JSON.stringify(data);
    saveQuestion(link, data);
    next();
  });
  //Questions.find({link: link}, function(err, questions) {
  //  if (/*questions.length == 0*/true) {
  //    searcher = new Searcher();
  //    searcher.search(link);
  //    searcher.on('find', function(data) {
  //      req.data = JSON.stringify(data);
  //      saveQuestion(link, data);
  //      next();
  //    });
  //  } else {
  //    console.log(link + ' from database');
  //    req.data = questions[0].question;
  //    next();
  //  }
  //});
});

//router.post('/', function(req, res, next) {
//   var templateReader = new TemplateReader();
//   templateReader.read(questionViewPath);
//   templateReader.on('end', function(source) {
//     var template = handlebars.compile(source);
//     console.log(req.data.toString());
//     req.html = template({questions: req.data});
//     console.log(req.html);
//     next();
//   });
// });

router.post('/', function(req, res) {
  res.type('json');
  res.send(req.data);
});

function saveQuestion(link, data) {
  return;
  var question = new Questions({link: link, question: data});
  question.save(function(error, question) {
          if (error) {
            return console.log(error.stack);
          }
        });
}

module.exports = router;
