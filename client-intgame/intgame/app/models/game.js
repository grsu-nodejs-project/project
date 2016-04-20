import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  questionTime: DS.attr('number'),
  questions: DS.hasMany('question')
});
