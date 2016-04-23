import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  model(params) {
    return this.store.find('game', params.game_id)
  },
  actions: {
    answer(param) {
      let controller = this.controllerFor('games.game');
      let nextQuestion = controller.get('questionsNumber') + 1;
      let allQuestion = this.currentModel.get('questionsNumber');
      if (nextQuestion == allQuestion) {
        console.log('end');
      } else {
        controller.set('questionsNumber', nextQuestion);
      }
      console.log(nextQuestion);
    }
  }
});
