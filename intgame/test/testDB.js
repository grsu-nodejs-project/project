'use strict';
var Searcher = require('../lib/httpPageSearcher');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/intgame');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var model = require('../lib/dbModel');

let links = ['http://db.chgk.info/tour/belsin05',
    'http://db.chgk.info/tour/belsc05',
    'http://db.chgk.info/tour/belcup06',
    'http://db.chgk.info/tour/turn13',
    'http://db.chgk.info/tour/bayrak',
    'http://db.chgk.info/tour/tern10mo',
    'http://db.chgk.info/tour/solika14',
    'http://db.chgk.info/tour/tor0910'
];

let Games = model.Games;

let promise = new Promise(function(resolve, reject) {
  let was = 0;
  links.forEach(function(link, index, array) {
    console.log(link);
    let searcher = new Searcher();
    searcher.search(link);
    searcher.on('find', (data) => {
      let name = `Игра №${index + 1}`;
      let game = Games({name: name,
          questionTime: 60,
          questions: data
      });
      game.save(function(err) {
        if (err) {

        } else {
          was++;
          console.log(was);
          if (was == array.length) {
            console.log(true);
            resolve('OKOKOK');
          }
        }
      });
    });
  });
});

promise
    .then(result => {
      //console.log(Games);
      Games.find({}, function(err, result) {
        console.log(result.length);
        let game1 = result[0];
        //console.log(game1);
        return 'all query complete';
      });
    })
    //.then(result => {
    //    console.log(result);
    //  Games.remove({}, function(err) {
    //    if (err) {
    //      console.log(err);
    //    } else {
    //      console.log('everething it\'s ok');
    //    }
    //  });
    //})
    .catch();

