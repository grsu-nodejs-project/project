import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  questionTime: DS.attr('number'),
  questions: DS.attr(),
  questionsNumber: Ember.computed('questions', function() {
    return this.get('questions').length;
  })
});
