/**
 * Created by root on 20.04.16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: 'name'
  },
  surname: {
    type: String,
    default: 'surname'
  },
  correctAnswers: {
    type: Number,
    default: 0
  },
  wrongAnswers: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});

var questionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  passCriteria: {
    type: String
  },
  comments: {
    type: String
  },
  sources: {
    type: String
  },
  image: {
    type: String
  }
});

var gameSchema = new Schema({
  name: {
    type: String
  },
  questionTime: {
    type: Number
  },
  questions: [questionSchema]
});

var commandSchema = new Schema({
  name: {
    type: String
  },
  correctAnswers: {
    type: Number
  },
  wrongAnswers: {
    type: Number
  },
  users: [userSchema],
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Games'
  }
});

var Users = mongoose.model('Users', userSchema);
var Questions = mongoose.model('Questions', questionSchema);
var Games = mongoose.model('Games', gameSchema);
var Commands = mongoose.model('Commands', commandSchema);

exports.Users = Users;
exports.Games = Games;
exports.Questions = Questions;
exports.Commands = Commands;
