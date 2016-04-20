import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('game').then(result => {
      console.log("YES");
      result.forEach(function(element) {
          console.log(element);
      });
      return result;
    });
  }
});
