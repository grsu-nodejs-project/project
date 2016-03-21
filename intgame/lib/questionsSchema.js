var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  link: {type: String, required: true, unique: true},
  question: {type: String, required: true}
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;
