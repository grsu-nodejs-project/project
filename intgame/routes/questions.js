var express = require('express');
var handlebars = require('handlebars');
var heredoc = require('heredoc');
var Searcher = require('../lib/httpPageSearcher')
var qs = require('querystring');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/intgame');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Questions = require('../lib/questionsSchema');

var questionForms = heredoc(function() { /*
	<html>
		<head>
			<title>Questions</title>
		</head>
		<body>
			<form action="/questions" method="post">
				<fieldset>
					<legend>Find questions</legend>
					<div>
						<input type="text" name="link" placeholder="enter you link" />
						<input type="submit" name="submit" value="find"></input>
					</div>
				</fieldset>
			</form>
		</body>
</html>
	*/
});

var router = express.Router();

router.get('/', function(req, res) {
	res.send(questionForms);
});

router.post('/', function(req, res, next) {
	var link = req.body.link;
	Questions.find({link: link}, function(err, questions) {
		if (questions.length == 0) {
			searcher = new Searcher();
			searcher.search(link);
			searcher.on('find', function(data) {
				req.data = data;
				var question = new Questions({link: link, question: data});
				question.save(function(error, question) {
					if (error) return console.log(error.stack);
				});
				next();
			});
		} else {
			console.log(link + " from database");
			req.data = questions[0].question;
			next();
		}
		
	});
});

router.post('/', function(req, res) {
	res.send(questionForms + req.data);
});

module.exports = router;