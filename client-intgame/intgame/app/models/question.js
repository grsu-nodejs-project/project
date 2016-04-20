import DS from 'ember-data';

export default DS.Model.extend({
  question: DS.attr('string'),
  answer: DS.attr('string'),
  passCriteria: DS.attr('string'),
  comments: DS.attr('string'),
  sources: DS.attr('string'),
  image: DS.attr('string'),
  game: DS.belongsTo('game')
});
