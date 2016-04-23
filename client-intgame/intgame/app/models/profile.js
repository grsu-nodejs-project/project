import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  surname: DS.attr('string'),
  correctAnswers: DS.attr('number'),
  wrongAnswers: DS.attr('number'),
  login: DS.attr('string'),
  password: DS.attr('string')
});
