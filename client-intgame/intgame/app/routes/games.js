import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('game').then(result => {
      console.log("YES");
      let value = 0;
      result.forEach(function(element) {

          console.log(element.id);
        value++;
      });
      return result;
    });
  }
});
