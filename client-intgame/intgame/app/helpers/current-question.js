import Ember from 'ember';

export function currentQuestion(params/*, hash*/) {
  let question = params.objectAt(0);
  let number = params.objectAt(1);
  return question.objectAt(number);
}

export default Ember.Helper.helper(currentQuestion);
