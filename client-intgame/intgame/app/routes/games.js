import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.findAll('game');
  },
  actions: {
    startGame(game) {
      this.transitionTo('games.game', game);
    }
  }
});
