import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    answer() {
      let answer = this.getProperties('answer');
      this.sendAction('onAnswer', answer);
    }
  }
});
